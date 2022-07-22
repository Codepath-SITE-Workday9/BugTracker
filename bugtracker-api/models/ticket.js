const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("./teams")

class Tickets 
{
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
        const requiredFields = ["developers", "projectId", "title", "description", "category", "priority", "status", "complexity"]
        requiredFields.forEach((field) => {
            if(!ticketInfo.hasOwnProperty(field))
            {
                throw new BadRequestError(`Required field ${field} missing from request!`)
            }
        })

        const userId = await Teams.fetchUserId(user.email)

        const results = await db.query(
            `
                INSERT INTO tickets
                (
                    developers, project_id, title, description, category, priority, status, complexity, creator_id,
                    created_by
                )
                VALUES( (SELECT ARRAY(SELECT id FROM users WHERE email = any($1))), $2, $3, $4, $5, $6, $7, $8, $9, $9)
                RETURNING  *
            `, [ticketInfo.developers, ticketInfo.projectId, ticketInfo.title, ticketInfo.description, ticketInfo.category, ticketInfo.priority, ticketInfo.status, ticketInfo.complexity, userId])
        
        const ticket = results.rows[0]
        console.log(ticket)
        Tickets.addTicketToProject(ticket.id, ticketInfo.projectId)

        return ticket
    }


    static async addTicketToProject(ticketId, projectId)
    {
        if(!ticketId)
        {
            throw new BadRequestError(`Missing the ticket id!`)
        }
        else if(!projectId)
        {
            throw new BadRequestError(`Missing the project id`)
        }

        const results = await db.query(
            `
                UPDATE projects
                SET tickets = ARRAY_APPEND(tickets, $1)
                WHERE id = $2 
            `, [ticketId, projectId])
    }


}


module.exports = Tickets