const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("./teams")

class Tickets 
{
    //FUNCTION TO LIST ALL THE TICKETS ASSOCIATED WITH A PROJECT
    static async listAllTickets()
    {
        //Function to fetch tickets for a project
    }







    //FUNCTION TO CREATE A NEW TICKET
    //Note: developers is an array of their emails~
    //Note: Clarify if creator_id is creator of the ticket or the project
    //Note: Clarify if created_by is creator of the ticket or project
    //Update the ticket to add closed_by default 0
    static async createTicket({user, ticketInfo})
    {
        //Check if all required fields to make a ticket are provided through the request body
        //If not, throw a bad request error detailing the missing field
        const requiredFields = ["developers", "projectId", "title", "description", "category", "priority", "status", "complexity"]
        requiredFields.forEach((field) => {
            if(!ticketInfo.hasOwnProperty(field))
            {
                throw new BadRequestError(`Required field ${field} missing from request!`)
            }
        })

        //Run a separate query to find the id of the user using the email provided by the local server
        const userId = await Teams.fetchUserId(user.email)


        //Run a query to create a new tickt by first getting the ids of all the users using their email,
        //And insert all the fields provided from the ticket info (request body) using the provided values
        const results = await db.query(
            `
                INSERT INTO tickets
                (
                    developers, project_id, title, description, category, priority, status, complexity, creator_id, created_by
                )
                VALUES( (SELECT ARRAY(SELECT id FROM users WHERE email = any($1))), $2, $3, $4, $5, $6, $7, $8, $9, $9)
                RETURNING  *
            `, [ticketInfo.developers, ticketInfo.projectId, ticketInfo.title, ticketInfo.description, ticketInfo.category, ticketInfo.priority, ticketInfo.status, ticketInfo.complexity, userId])
        
            
        //Store all the new ticket information and then run a separate query to add the ticket to the projects table 
        const ticket = results.rows[0]
        Tickets.addTicketToProject(ticket.id, ticketInfo.projectId)

        //Return the newly created ticket information
        return ticket
    }







    //FUNCTION TO ADD A TICKET TO A PROJECT
    static async addTicketToProject(ticketId, projectId)
    {
        //Check if the ticket id or project id is present
        //If not, throw a bad request error detailing the missing id
        if(!ticketId)
        {
            throw new BadRequestError(`Missing the ticket id!`)
        }
        else if(!projectId)
        {
            throw new BadRequestError(`Missing the project id`)
        }

        //Run a query to update the tickets field in the projects table
        //By appending the ticket to the existing array of ticket ids
        const results = await db.query(
            `
                UPDATE projects
                SET tickets = ARRAY_APPEND(tickets, $1)
                WHERE id = $2 
            `, [ticketId, projectId])
    }


}


module.exports = Tickets