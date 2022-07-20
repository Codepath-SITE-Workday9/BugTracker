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
                    LEFT JOIN teams on teams.id = pro.id
                WHERE $1 = any(teams.members) OR (pro.creator_id = $1)
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

        //Return the new project information
        return results.rows[0]
    }







    //FUNCTION TO FETCH SPECIFIC PROJECT INFORMATION GIVE THE PROJECT ID
    static async fetchProjectById({projectId, user})
    {
        //Run a query to obtain the id of the user given their user email from the local server
        const userId = await Teams.fetchUserId(user.email)

        
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
        
        const project = results.rows[0]
        if(!project)
        {
            throw new NotFoundError("Project was not found!")
        }

        return project
    }



    //UPDATE A PROJECT'S INFORMATION
    static async updateProjectInfo()
    {
        //Update a project's information
    }
}

module.exports = Projects