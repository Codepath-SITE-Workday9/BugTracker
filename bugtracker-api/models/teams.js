const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const User = require("./user")

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
            throw new NotFoundError("Team was not found! Could not create new team!")
        }

        //Return the team's information
        return team
    }




    


    //FUNCTION TO ADD A NEW TEAM MEMBER TO AN EXISITNG TEAM
    static async addNewTeamMember({teamId, newMember, user})
    {
        //If a new member was not provided, throw a bad request error detailing that the user needs to provide a member email
        if(!newMember)
        {
            throw new BadRequestError(`New user information is missing! Please provide an email!`)
        }

        //Run a separate query to find the id of the member who's email matches the given member email
        const newMemberId = await Teams.fetchUserId(newMember.email)

        //Run a separate query to determine whether the new member already exists within the members of the chosen team
        const existingMember = await Teams.checkExistingMember(newMemberId, teamId)

        //If the new member already exists within the members of a chosen team, throw a bad request error detailing duplicate member
        if(existingMember)
        {
            throw new BadRequestError(`Duplicate Member: ${newMember.email}! Member is already on this team!`)
        }

        //Run a query to find the id of the user who is making the request to add a new member
        const userId = await Teams.fetchUserId(user.email)


        //Run a query to update the members of team by first finding the specific team a user requested,
        //Then check whether user is authorized to access the team by checking if they are a creator of the team or a member
        //If this information matches, then update the members of a team by appending the new member id to the existing array
        //Return the new team information
        const results = await db.query(
            `
                UPDATE teams
                SET members = ARRAY_APPEND(members, $1)
                WHERE id = $2 AND 
                ((creator_id = $3) OR ($3 = any(members)))
                RETURNING *
            `, [newMemberId, teamId, userId])


        //Store the results of the new team information
        //If user is not authorized to change the team information or the teamId is not found or the array can not be updated
        //Then throw a not found error detailing that the request could not be executed
        const newTeam = results.rows[0]
        if(!newTeam)
        {
            throw new NotFoundError("Team was not found! Could not add new member!")
        }

        //Return the new team information with the updated members array
        return newTeam
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






    //FUNCTION TO CHECK WHETHER THE GIVEN USER ALREADY EXISTS AS A MEMBER IN THE TEAM
    static async checkExistingMember(memberId, teamId)
    {
        //If no member id is provided, then throw a bad request error
        if(!memberId)
        {
            throw new BadRequestError("No member id provided!")
        }

        //Run a query to find a specific team by id and then compare the given member id to the members of that team
        //Store the results of the query
        const results = await db.query(
            `
                SELECT * FROM teams WHERE $1 = any(teams.members) AND id = $2
            `,[memberId, teamId])

        
        //If a member is found, return the team information
        return results.rows[0]
    }





    //FUNCTION TO RETURN AN ARRAY OF USERS FROM A TEAM
    static async fetchMembersForATeam(teamId, user)
    {
        //If no team id is provided, then throw a bad request error
        if(!teamId)
        {
            throw new BadRequestError("No team id provided!")
        }

        // Fetch the team information 
        const team = await Teams.fetchTeamById(teamId, user)

        //Runs a query to find all users from the team 
        //If successful, returns all the users as an array
        const results = await db.query(
            `
                SELECT * FROM users WHERE id = any($1) 
            `,[team.members])
        
        //Return all the users that are apart of a team 
        return results.rows
    }

    //FUNCTION TO RETURN AN ARRAY OF PROJECTS THAT A TEAM HAS
    static async fetchProjectsForATeam({teamId})
    {
        //If no team id is provided, then throw a bad request error
        if(!teamId)
        {
            throw new BadRequestError("No team id provided!")
        }

        // // Fetch the team information 

        //Runs a query to find all projects that a team is apart of
        //If successful, returns all the projects as an array
        const results = await db.query(
            `
                SELECT * FROM projects WHERE $1 = any(projects.teams) 
            `,[teamId])
        
        //Return all the projects that a team is working on
        return results.rows
    }
}

module.exports = Teams