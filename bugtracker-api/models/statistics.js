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
    }

    static async fetchStatisticsByProject()
    {
        //Function to get the average statistics about tickets within a specific project
    }

    static async fetchTeamVelocity()
    {
        //Function to get the total ticket closing velocity of a team 
    }
}


module.exports = Statistics