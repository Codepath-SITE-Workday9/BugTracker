const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("./teams")
const Tickets = require("./ticket")

class Statistics 
{
    //FUNCTION TO GET THE TICKET STATISTICS OF ALL PROJECTS A USER IS A CREATOR/PART OF
    static async fetchTicketStatistics({user})
    {
        //ERROR CHECKING - Make sure that user information about the user who is logged in is provided (pulled from local server); If not, throw bad request error,
        if(!user)
        {
            throw new BadRequestError(`Missing user information from request`)
        }

        //Run  a separate query to get the id of the user using their email from the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a separate query to get all the ids of all the projects a user is a member or creator of
        //Then, map through the object list of ids and obtain only the values to store it in an array of project ids
        //If the user is not part of any project, the projectIds array will be empty and statistics will return empty arrays
        const projectList = await db.query(
            `
                SELECT pro.id
                FROM projects as pro
                    LEFT JOIN teams on teams.id = pro.id
                WHERE $1 = any(teams.members) OR (pro.creator_id = $1)
            `, [userId])
        const projectIds = projectList.rows.map(project => project.id)


        //MAIN QUERIES - 
        //Construct the query to filter all ticket statistics by category
        //Run that constructed query and send in the array of project ids to match the project tickets to pull info from
        let query = await Statistics.constructQuery(`category`, projectIds)
        const perCategory = await db.query(query, [projectIds])

        //Construct the query to filter all ticket statistics by priority
        //Run that constructed query and send in the array of project ids to match the project tickets to pull info from
        query = await Statistics.constructQuery(`priority`, projectIds)
        const perPriority = await db.query(query, [projectIds])

        //Construct the query to filter all ticket statistics by status
        //Run that constructed query and send in the array of project ids to match the project tickets to pull info from
        query = await Statistics.constructQuery(`status`, projectIds)
        const perStatus = await db.query(query, [projectIds])
        


        //Build an object that store the name of each filter field with the number of total tickets that matched the filter
        //Return that object back to the Client
        const statistics = {perCategory: perCategory.rows, perPriority: perPriority.rows, perStatus: perStatus.rows}
        return statistics
    }









    //FUNCTION TO GET THE TICKET STATISTICS FOR A SPECIFIC PROJECT
    static async fetchStatisticsByProject({user, projectId})
    {
        if(!projectId)
        {
            throw BadRequestError(`Missing the project id from your request!`)
        }

        const userId = await Teams.fetchUserId(user.email)

        const validAccess = await Tickets.validUserAccess(projectId, userId)
        if(!validAccess)
        {
            throw NotFoundError(`This project was not found! Can not access this project!`)
        }

        //MAIN QUERIES - 
        //Construct the query to filter all ticket statistics by category
        //Run that constructed query and send in the array of project ids to match the project tickets to pull info from
        let query = await Statistics.constructQuery(`category`, projectId)
        const perCategory = await db.query(query, [projectId])

        //Construct the query to filter all ticket statistics by priority
        //Run that constructed query and send in the array of project ids to match the project tickets to pull info from
        query = await Statistics.constructQuery(`priority`, projectId)
        const perPriority = await db.query(query, [projectId])

        //Construct the query to filter all ticket statistics by status
        //Run that constructed query and send in the array of project ids to match the project tickets to pull info from
        query = await Statistics.constructQuery(`status`, projectId)
        const perStatus = await db.query(query, [projectId])



        //Build an object that store the name of each filter field with the number of total tickets that matched the filter
        //Return that object back to the Client
        const statistics = {perCategory: perCategory.rows, perPriority: perPriority.rows, perStatus: perStatus.rows}
        return statistics
    }






    




    static async constructQuery(field, projectIds)
    {
        //ERROR CHECKING - Ensure that a field to filter by is provided and the project ids a user wants to compare for statistics; If not return a bad request error
        if(!field){
            throw BadRequestError(`Missing the field you want to filter by to construct the query!`)
        }
        else if(!projectIds){
            throw BadRequestError(`Missing projectIds from your request to construct query!`)
        }

        //Check if the user has provided an array of ids to compare or a singular id;
        //If array of ids, then change the query command to search through the array
        //If single id, then change the query to command to compare only the single id
        let qualifier;
        if(Array.isArray(projectIds)){
            qualifier = `any($1) `
        }
        else{
            qualifier = `$1 `
        }


        //MAIN QUERY - 
        //Construct the generalized query statement to filter by a certain field (category, priority, status) and then provided the comparison qualifier (array or single id)
        const query = 
            `SELECT ${field}, COUNT(*) as totalTickets ` +
            `FROM tickets ` +
            `WHERE project_id = ` + qualifier +
            `GROUP BY ${field}`

        //Return the query to be used for filtering
        return query
    }










    static async fetchTeamVelocity()
    {
        //Function to get the total ticket closing velocity of a team 
    }
}


module.exports = Statistics