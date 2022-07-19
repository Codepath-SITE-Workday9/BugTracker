const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")

class Teams
{
    //FUNCTION GET A LIST OF ALL THE TEAMS A USER IS A PART OF
    static async listAllTeams({user})
    {
        //Runs a query to find all the teams a user is a part of by : 
        //First, finding the id of the user given the user's email from the local server
        //And then matching this id to any of the teams where this id matches a member's id in a team
        const userId = await Teams.fetchUserId(user.email)
        const results = await db.query(
            `
                SELECT *
                FROM teams 
                WHERE $1 = any(teams.members)
            `, [userId])
        


        //Return all the teams a user is a part of
        return results.rows
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


        //Calls a separate query to find the id of the user given only the user's email
        const userId = await Teams.fetchUserId(user.email)



        //Inserts into the teams table the team name, members, projects, and id of the creator (in this case it is the user who created the team
        //To find the id of all the members, 
        //the query finds the id of all the users who have the same email as those from the members list (request body)
        //And then turns the results of the sub query into an integer array
        //To find the id of the user who created the team,
        //The query finds the id from the users table where the email matches the email of the user in the local serve
        const results = await db.query(
            `
                INSERT INTO teams
                (
                    name,
                    members,
                    projects,
                    creator_id
                )
                VALUES($1, (SELECT ARRAY(SELECT id FROM users WHERE email = any($2))), $3, $4)
                RETURNING id, name, members, creator_id, projects
            `, [teamInfo.name, teamInfo.members, teamInfo.projects, userId])
        


        //Return the new team information
        return results.rows[0]
    }







    //FUNCTION TO RETURN A SPECIFIC TEAM GIVEN THE TEAM'S ID
    static async fetchTeamById({teamId, user})
    {
        //Calls a separate query to find the id of the user given the user's email
        const userId = await Teams.fetchUserId(user.email)




        //Runs a query to find the specific team's information using the team id
        //First, the query checks that the team's id matches the given id
        //And then checks if the user has created this team or is a member of this team
        //If neither, user is not authorized to access these teams and is given a not found error instead
        const results = await db.query(
            `
                SELECT *
                FROM teams
                WHERE id = $1 AND 
                ((creator_id = $2) OR ($2 = any(members)))
            `, [teamId, userId])




        //Check to see if the team has been found. If not, return a not found error
        const team = results.rows[0]
        if(!team)
        {
            throw new NotFoundError()
        }




        //Return the team's information
        return team
    }







    static async addNewTeamMember()
    {
        //Add a new member to a team
    }




    


    //FUNCTION TO FIND A USER'S ID GIVEN ONLY THE USER EMAIL
    static async fetchUserId(email)
    {
        //If no email has been provided by previous queries/functions, return a bad request error
        if(!email)
        {
            throw new BadRequestError("No email provided")
        }


        //Run a query to find the id of the user who's email matches the given email
        const query = `SELECT id FROM users WHERE email = $1`
        const results = await db.query(query, [email])


        //Store the id of the user and return it
        const userId = results.rows[0].id
        return userId
    }
}

module.exports = Teams