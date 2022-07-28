const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("./teams")

class Statistics 
{
    static async fetchTicketStatistics({user})
    {
        const userId = await Teams.fetchUserId(user.email)
        const projectList = await db.query(
            `
                SELECT pro.id
                FROM projects as pro
                    LEFT JOIN teams on teams.id = pro.id
                WHERE $1 = any(teams.members) OR (pro.creator_id = $1)
            `, [userId])
        let projectIds = projectList.rows.map(project => project.id)

        //Check the categories of every ticket who's project id is equal to the projects above
        //Check the priority of every ticket who's project id is equal to the projects above
        //Check the status of every ticket who's project id is equal to the projects above
        const perCategory = await db.query(
            `
                SELECT category, COUNT(*) as totalTickets
                FROM tickets
                WHERE project_id = any($1)
                GROUP BY category
            `, [projectIds])

        const perPriority = await db.query(
            `
                SELECT priority, COUNT(*) as totalTickets
                FROM tickets
                WHERE project_id = any($1)
                GROUP BY priority
            `, [projectIds])

        const perStatus = await db.query(
            `
                SELECT status, COUNT(*) as totalTickets
                FROM tickets
                WHERE project_id = any($1)
                GROUP BY status
            `, [projectIds])

        const statistics = {perCategory: perCategory.rows, perPriority: perPriority.rows, perStatus: perStatus.rows}
        console.log(statistics)
    }

    static async fetchStatisticsByProject()
    {
        //Function to get the average statistics about tickets within a specific project
    }

    static async constructQuery()
    {
        //Function create a generalized query for getting the category, priority, and status statistics for either an individual or multiple projects
        //Take in the field to filter by (category, status, or priority, and take in projectIds)
    }

    static async fetchTeamVelocity()
    {
        //Function to get the total ticket closing velocity of a team 
    }
}


module.exports = Statistics