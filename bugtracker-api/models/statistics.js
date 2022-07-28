const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("./teams")

class Statistics 
{
    static async fetchTicketStatistics({user})
    {
        const userId = await Teams.fetchUserId(user.email)
        const projects = await db.query(
            `
                SELECT projects.id
                FROM projects as pro
                    LEFT JOIN teams on teams.id = pro.id
                WHERE $1 = any(teams.members) OR (pro.creator_id = $1)
            `, [userId])

        console.log(projects)
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