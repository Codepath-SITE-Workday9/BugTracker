const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")

class Teams
{
    static async listAllTeams()
    {
        //List all teams a user belongs to
    }






    //FUNCTION TO CREATE A NEW TEAM FOR THE USER
    //Takes in only the name of the team, members, and projects associated with the team
    //And then inserts the results of the query into the database
    static async createTeam({user, teamInfo})
    {
        //Checks that all required fields are present within the request body including name of the team, members, and projects
        //If part of the necessary fields are not present, then throw a bad request error detailing the missing field
        const requiredFields = ["name", "members", "projects"]
        requiredFields.forEach((field) => {
            if(!teamInfo.hasOwnProperty(field))
            {
                throw new BadRequestError(`Required field ${field} missing from request!`)
            }
        })



        
        //Inserts into the teams table the team name, members, projects, and id of the creator (in this case it is the user who created the team
        //To find the id of all the members, 
        //the query finds the id of all the users who have the same email as those from the members list (request body)
        //And then turns the results of the sub query into an integer array
        //To find the id of the user who created the team,
        //The query finds the id from the users table where the email matches the email of the user in the local server
        const results = await db.query(
            `
                INSERT INTO teams
                (
                    name,
                    members,
                    projects,
                    creator_id
                )
                VALUES($1, (SELECT ARRAY(SELECT id FROM users WHERE email = any($2))), $3, (SELECT id FROM users WHERE email = $4))
                RETURNING id, name, members, creator_id, projects
            `, [teamInfo.name, teamInfo.members, teamInfo.projects, user.email])
        


        //Return the new team information
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
}

module.exports = Teams