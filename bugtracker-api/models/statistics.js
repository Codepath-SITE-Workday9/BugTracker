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









    //FUNCTION TO FIND THE AMOUNT OF TICKETS OPENED AND CLOSED OVER TIME
    static async fetchProgressOvertime({user})
    {
        //ERROR CHECKING - Ensuring that user information is being provided to function
        if(!user)
        {
            throw new BadRequestError("No user information was provided!")
        }

        //Run a separate query to get the id of the user from the user's email
        const userId = await Teams.fetchUserId(user.email)

        //Run a query to get a list of all the projects a user is a member or creator of
        //And extract only the project ids
        const projectList = await db.query(
            `
                SELECT pro.id
                FROM projects as pro
                WHERE $1 = any(SELECT UNNEST(members) FROM teams) OR (pro.creator_id = $1)
            `, [userId])
        const projectIds = projectList.rows.map(project => project.id)



        //MAIN QUERIES
        //Run a query to get the amount of tickets that were opened by the user given all the projectIds
        //Run a separate function to store the just the totaltickets for each month in an array
        let query = await Statistics.constructProgressQuery(`created_by`)
        const openedByUser = await db.query(query, [projectIds, userId])
        let monthlyStatsOpened = await Statistics.createMonthlyStatsArray(openedByUser.rows)


        //Run a query to get the amount of tickets that were closed by the user given all the projectIds
        //Run a separate function to store the just the totaltickets for each month in an array
        query = await Statistics.constructProgressQuery(`closed_by`)
        const closedByUser = await db.query(query, [projectIds, userId])
        let monthlyStatsClosed = await Statistics.createMonthlyStatsArray(closedByUser.rows)



        //Return an object containing the amount of tickets opened and closed by the user both as objects and arrays of monthly data
        return {openedByUser: openedByUser.rows, closedByUser: closedByUser.rows, monthlyStatsOpened: monthlyStatsOpened, monthlyStatsClosed: monthlyStatsClosed}
    }







    //FUNCTION  TO CREATE AN ARRAY OF TOTALTICKETS PER MONTH
    static createMonthlyStatsArray(monthsArray)
    {
        //ERROR-CHECKING: Check that an object with the months and totaltickets per month as provided
        //If not, throw a bad request error detailing that the array of objects is missing
        if(!monthsArray)
        {
            throw new BadRequestError(`No information of totaltickets per month was provided!`)
        }

        //Create a new array to represent all the months in a year
        let monthlyStats = new Array(12).fill(0)

        //Iterate through the array of objects containing the month and totaltickets for that month
        //Extract the month from the given substring in date and make sure that it is stored as a number
        //Find the index in the array corresponding to that month and update the value to the totaltickets
        monthsArray?.map((month) => {
            let numOfMonth = parseInt(month.date.substring(5,7))
            monthlyStats[numOfMonth - 1] = parseInt(month.totaltickets)
        })

        //Return an array containing all the tickets per month
        return monthlyStats
    }








    //FUNCTION TO CONSTRUCT A QUERY TO EITHER GET TICKET STATISTICS THAT WERE CREATED OR CLOSED BY THE USER
    static async constructProgressQuery(qualifier)
    {
        //Check if function was provided with either the key word "created_by" or "closed_by"
        if(!qualifier)
        {
            throw new BadRequestError("Missing a qualifier to determine if user wants open and closed tickets over time!")
        }

        //Construct the query to reflect that qualifier
        const query = 
            `SELECT SUBSTRING (cast(tickets.created_at AS TEXT), 1, 7) as date, COUNT(*) as totalTickets ` +
            `FROM tickets ` +
            `WHERE project_id = any($1) AND ` + qualifier + ` = $2 ` +
            `GROUP BY date`

        //Return the newly constructed query containing either information for created by or closed by
        return query
    }








    //FUNCTION TO GET AMOUNT OF COMPLEXITY POINTS OF OPENED TICKETS OVER MONTHS
    static async fetchComplexityOvertime({user})
    {
        if(!user)
        {
            throw new BadRequestError("Missing an user information from your request!")
        }
        const userId = await Teams.fetchUserId(user.email)

        const results = await db.query(
            `
                SELECT SUBSTRING (cast(created_at AS TEXT), 1, 7) as date, SUM(complexity) as total_complexity
                FROM tickets
                WHERE $1 = any(developers)
                GROUP BY date
            `, [userId])

        let monthlyStats = new Array(12).fill(0)
        results.rows.map((month) => {
            let numOfMonth = parseInt(month.date.substring(5,7))
            monthlyStats[numOfMonth - 1] = parseInt(month.total_complexity)
        })

        return {complexityPerMonth: results.rows, complexityArray: monthlyStats}
    }










    static async fetchTeamVelocity()
    {
        //Function to get the total ticket closing velocity of a team 
    }
}


module.exports = Statistics