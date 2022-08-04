const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("../models/teams")

class Projects
{

    //FUNCTION TO GET A LIST OF ALL THE PROJECTS A USER IS A PART OF OR CREATOR OF
    static async listAllProjects({user})
    {
        //First, runs a query to find the id of the user given the user's email from the local server
        const userId = await Teams.fetchUserId(user.email)
        //Runs a query to find all the projects a user is a creator or member of:
        //First, the query combines the information from both the projects and teams table
        //Then finds the project's teams where a user is a member and then checks whether the user is a creator of the project
        //If successful, return all the project information
        // Note: GROUP BY pro.id was added recently
            const results = await db.query(
                `
                    SELECT pro.id,
                           pro.name,
                           pro.description,
                           pro.image_url,
                           pro.tickets,
                           pro.teams,
                           pro.created_at,
                           pro.creator_id
                    FROM projects as pro
                        INNER JOIN teams ON teams.id = any(pro.teams)
                    WHERE $1 = any(SELECT UNNEST(members) FROM teams WHERE id = any(pro.teams)) OR (pro.creator_id = $1)
                    GROUP BY pro.id
                    ORDER BY pro.id ASC
                `, [userId])
        
        //Return all the projects a user is a part of
        return results.rows
    }







    //FUNCTION TO CREATE A NEW PROJECT
    static async createProject({user, projectInfo})
    {
        //Check whether all required fields are present including name, description, imageUrl, tickets (id for all tickets), and teams (id for all teams)
        //If one of the fields is missing, then throw a bad request error detailings the missing field
        const requiredFields = ["name", "description", "imageUrl", "tickets", "teams"]
        requiredFields.forEach((field) => {
            if(!projectInfo.hasOwnProperty(field))
            {
                throw new BadRequestError(`Required field ${field} missing from request!`)
            }
        })

        //Fetch the id of the user who is creating the project by sending their email to a function within the Teams model that finds the id
        //If unsuccessful, the function from Teams will throw a bad request error detailing that an email is needed
        const userId = await Teams.fetchUserId(user.email)

        //Run a query to insert the project information into the database
        //Insert all the information provided by user into respective fields and, for creator id, use the userId obtained from previous query
        const results = await db.query(
            `
                INSERT INTO projects
                (
                    name, description, image_url, tickets, teams, creator_id
                )
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING id, name, description, image_url, tickets, teams, created_at, creator_id
            `, [projectInfo.name, projectInfo.description, projectInfo.imageUrl, projectInfo.tickets, projectInfo.teams, userId])
        
        //Run a separate query to add the new project id to all the teams associated with the new project
        await Projects.addProjectToTeams(results.rows[0].id, results.rows[0].teams)

        //Return the new project information
        return results.rows[0]
    }





    static async addProjectToTeams(projectId, teams)
    {
        //ERROR CHECKING - Ensure that a project id and the an array of team is provided; If not, throw a bad request error stating the missing field
        if(!projectId)
        {
            throw new BadRequestError(`Missing the projectId from your request!`)
        }
        else if(!teams)
        {
            throw new BadRequestError(`Missing the teams from your request!`)
        }

        //Run a separate query to append the new project id to all the teams in the provided teams array
        const results = db.query(
            `
            UPDATE teams
            SET projects = ARRAY_APPEND(projects, $1)
            WHERE id = any($2) 
            `, [projectId, teams])
    }







    //FUNCTION TO FETCH SPECIFIC PROJECT INFORMATION GIVE THE PROJECT ID
    static async fetchProjectById({projectId, user})
    {
        //Run a query to obtain the id of the user given their user email from the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a query to find the specific project information by id
        //User can not access the project info if they are not a creator or member of the project
        //First, search is the project id can be found and then checks if the user is the creator of the project id
        //Or a member of one of the teams on the project
        const results = await db.query(
            `
                SELECT pro.id,
                       pro.name,
                       pro.description,
                       pro.image_url,
                       pro.tickets,
                       pro.teams,
                       pro.created_at,
                       pro.creator_id
                FROM projects AS pro
                    LEFT JOIN teams ON teams.id = pro.id
                WHERE pro.id = $1 AND ((pro.creator_id = $2) OR $1 = any(teams.members))
            `, [projectId, userId])
        
        //If the project id could not found, the user is not a member or creator of the project,
        //Throw a bad request error saying that the project was not found
        const project = results.rows[0]
        if(!project)
        {
            throw new NotFoundError("Project was not found!")
        }

        //Return the specific project information
        return project
    }







    //FUNCTION TO UPDATE SPECIFIC PROJECT INFORMATION 
    static async updateProjectInfo({projectId, projectInfo, user})
    {
        //ERROR HANDLING ------------------
        //Check if the user inputted valid project information to change; If not, throw a bad request error detailing that info is missing
        if(!projectInfo)
        {
            throw new BadRequestError(`New project information is missing!`)
        }

        //Check if the project can be accessed by the user (check if user is creator or member); If not, throw a not found error
        const project = await Projects.fetchProjectById({projectId, user})
        if(!project)
        {
            throw new NotFoundError("Project was not found! Could not update information!")
        }


        //MAIN QUERY TO UPDATE PROJECT -------------
        //Run a separate query to get the id of the user using the email provided from the local server
        const userId = await Teams.fetchUserId(user.email)

        //Get the names of all the fields the user wants to update by extracting from the object sent from frontend; 
        //Property names becomes an array of all those fields
        const propertyNames = Object.keys(projectInfo)


        //Loop through every field and run a function to create the query statement to update the field
        //Run the given query to update the specific field with the new user's value
        //Then check the validity of the update; If unable to update, throw a bad request error detailing the field was invalid
        propertyNames.forEach(async(field) => {
            const query = Projects.createUpdateStatement(field)
            const results = await db.query(query, [projectInfo[field], projectId, userId])
            const project = results.rows[0]
            if(!project)
            {
                throw new BadRequestError(`Unable to update project! The ${field} is invalid!`)
            }
        })

        
        //Return the project's updated information
        const updatedProject = await Projects.fetchProjectById({projectId, user})
        return updatedProject
    }






    //FUNCTION TO CREATE THE QUERY STATEMENT TO UPDATE THE USER'S SPECIFIC PROJECT FIELD WITH NEW INFORMATION
    static createUpdateStatement(field)
    {
        const query = 
        `UPDATE projects SET ${field} = $1 FROM teams ` + 
        `WHERE projects.id = $2 AND ((projects.creator_id = $3) OR $3 = any(teams.members)) ` +
        `RETURNING projects.id, projects.name, projects.description, projects.image_url, projects.tickets, projects.teams, projects.created_at, projects.creator_id`
        
        //Return the new query statement
        return query
    }
}

module.exports = Projects