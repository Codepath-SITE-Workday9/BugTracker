const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("../models/teams")

class Projects
{
    //FETCH ALL PROJECTS FOR A USER
    static async listAllProjects()
    {
        //function
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







    //FETCHES SPECIFIC PROJECT INFORMATION
    static async fetchProjectbyId()
    {
        //Fetches specific project information
    }



    //UPDATE A PROJECT'S INFORMATION
    static async updateProjectInfo()
    {
        //Update a project's information
    }
}

module.exports = Projects