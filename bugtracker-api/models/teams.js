const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")

class Teams
{
    static async listAllTeams()
    {
        //List all teams a user belongs to
    }

    static async createTeam({user, teamInfo})
    {
        const requiredFields = ["name", "members", "projects"]
        requiredFields.foreach((field) => {
            if(!teamInfo.hasOwnProperty(field))
            {
                throw new BadRequestError(`Required field ${field} missing from request!`)
            }
        })

        const results = await db.query(
            `
                INSERT INTO teams
                (
                    name,
                    members,
                    projects,
                    creator_id
                )
                VALUES($1, $2, $3, (SELECT id FROM WHERE email = $4))
                RETURNING id, name, members, creator_id, projects
            `, [teamInfo.name, teamInfo.members, teamInfo.projects, user.email])
        
        return results.rows[0]
    }

    static async fetchTeamById()
    {
        //Returns a sepcific team by id
    }

    static async addNewTeamMember()
    {
        //Add a new member to a team
    }

    static async fetchMembersById(members)
    {
        if(!members)
        {
            throw new BadRequestError("No list of members' emails was provided!")
        }

        let membersList = [];
        const query = `SELECT id FROM WHERE email = $1`
        members?.map(async (email) => {
            const result = await db.query(query, [email])
            membersList.push(result.rows[0])
        })

        return membersList
    }
}

module.exports = Teams