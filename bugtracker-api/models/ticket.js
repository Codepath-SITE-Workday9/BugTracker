const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("./teams")

class Tickets 
{
    //FUNCTION TO LIST ALL THE TICKETS ASSOCIATED WITH A PROJECT
    static async listAllTickets({user, projectId})
    {
        //ERROR CHECKING - check that a projectId has been provided in the request body; If not, throw a bad request error detailing missing field
        if(!projectId)
        {
            throw new BadRequestError(`Missing the project id from request!`)
        }

        //Run a separate query to get the id of the user using the email provided by the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a separate query to check if the user is able to access project information
        //If undefined, then throw a not found error because user is neither a creator or member of the project
        const validAccess = await Tickets.validUserAccess(projectId, userId)
        if(!validAccess)
        {
            throw new NotFoundError(`Project was not found!`)
        }


        //At this point, user should be someone with valid access to project information with a valid projectId
        //Run a main query to get all the tickets that belong to a particular project by comparing the project id with the given id
        const results = await db.query(
            `
                SELECT *
                FROM tickets
                WHERE project_id = $1
                ORDER BY tickets.id ASC
            `, [projectId])

        //Return a list of all the tickets associated with a project
        return results.rows
    }








    //FUNCTION TO CHECK IF USER IS ABLE TO ACCESS OR UPDATE PROJECT INFORMATION
    static async validUserAccess(projectId, userId)
    {
        //ERROR CHECKING - Check if a projectId and userId have been provided; If not, throw a bad request error detailing missing field
        if(!projectId)
        {
            throw new BadRequestError(`Whoops, Missing the projectId!`)
        }
        else if(!userId)
        {
            throw new BadRequestError(`Whoops, missing the userId!`)
        }

        //Run a separate query to check if user is able to access project information
        //First find the project in the database by comparing the projectId;
        //Then check if a user is the creator of the project or a member of any of the teams in the project
        const results = await db.query(
            `
                SELECT *
                FROM projects
                    LEFT JOIN teams ON teams.id = projects.id
                WHERE projects.id = $1 AND ((projects.creator_id = $2) 
                OR ($2 = any(teams.members) AND teams.id = any(projects.teams)))
            `, [projectId, userId])
        
        //If user is a creator or member of a project, then return project information; Else, return undefined
        return results.rows[0]
    }








    //FUNCTION TO CREATE A NEW TICKET
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








    //FUNCTION TO RETRIEVE SPECIFIC TICKET DETAILS GIVEN THE TICKET ID
    static async fetchTicketbyId({ticketId, user})
    {
        //ERROR CHECKING - Check that a ticketId is provided through the req.params; If not, throw an error detailing missing field
        if(!ticketId)
        {
            throw new BadRequestError(`Missing the ticket id from request!`)
        }


        //Run a separate query to fetch the id of the user using the email provided by the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a separate query to find the projectId assigned to the ticket by sending the ticketId
        const projectId = await db.query(`SELECT project_id FROM tickets WHERE tickets.id = $1`, [ticketId])

        //Check if the user is allowed access to the ticket information by running a query to check if user is a project creator or member
        //If not, return undefined and throw a not found error detailing that the user can not access the ticket
        const validAccess = await Tickets.validUserAccess(projectId.rows[0].project_id, userId)
        if(!validAccess)
        {
            throw new NotFoundError("Sorry, can not access this ticket!")
        }


        //Run  a main query to obtain all the ticket information by comparing the id with the ticket id provided from request
        const results = await db.query(
            `
                SELECT * 
                FROM tickets
                WHERE tickets.id = $1
            `, [ticketId])
        
        //Return all the specific ticket information if successful
        return results.rows[0]
    }









    //FUNCTION TO UPDATE A TICKET'S INFORMATION
    static async updateTicketInfo({ticketId, ticketInfo, user})
    {
        //ERROR CHECKING - Check if the user has provided a request body within the name and value of the field they want to update
        //If not, throw a bad request error detailing the missing field
        if(!ticketInfo)
        {
            throw new BadRequestError(`New Ticket Information is missing!`)
        }


        //Run a query to retrieve the id of the user using the email from the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a separate query to find the project id assigned to the ticket by sending the ticketId
        const projectId = await db.query(`SELECT project_id FROM tickets WHERE tickets.id = $1`, [ticketId])
        
        //Check if the user is allowed access to the ticket information by running a query to check if user is a project creator or member
        //If not, return undefined and throw a not found error detailing that the user can not access the ticket
        const validAccess = await Tickets.validUserAccess(projectId.rows[0].project_id, userId)
        if(!validAccess)
        {
            throw new NotFoundError("Sorry, can not access this ticket!")
        }


        //Get the names of all the fields the user want to update by extracting from the object sent in request body
        //Property names becomes an array of all those fields
        const propertyNames = Object.keys(ticketInfo)


        //loop through every field and run the given query to update the specific field with the new user's value
        //Then check the validity of the update; If unable to update, ticket should be undefined and throw bad request error detailing error
        propertyNames.forEach(async(field) => {
            const results = await db.query(
                `
                    UPDATE tickets
                    SET ${field} = $1
                    WHERE tickets.id = $2
                    RETURNING *
                `, [ticketInfo[field], ticketId])
            const ticket = results.rows[0]
            if(!ticket)
            {
                throw new BadRequestError(`Unable to update ticket! The ${field} is invalid!`)
            }
        })

        //Return the ticket's updated information
        const updatedTicket = await Tickets.fetchTicketbyId({ticketId, user})
        return updatedTicket
    }









    static async createComment({ticketId, user, commentInfo})
    {
        //ERROR CHECKING - Check that the content field is provided by the user; If not, throw a bad reqeust detailing that the content is missing from the request body
        const requiredField = "content"
        if(!commentInfo.hasOwnProperty(requiredField))
        {
            throw new BadRequestError(`Required field ${requirdField} missing from request!`)
        }

        //Run a separate query to get the id of the user using the email from the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a separate query to get the project id the ticket is associated with using the given ticketId from the req.params
        const projectId = await db.query(`SELECT project_id FROM tickets WHERE tickets.id = $1`, [ticketId])

        //Run a separate query to assure that user has access to the tickets if they are a member or creator of the project;
        //If the user does not have valid access to the project, they can not comment on the ticket; Throw a not found error detailing that user has no access
        const validAccess = await Tickets.validUserAccess(projectId.rows[0].project_id, userId)
        if(!validAccess)
        {
            throw new NotFoundError("Sorry, can not access this ticket!")
        }



        //MAIN QUERY - Insert a new comment into the dtabase by using the userId, ticketId, and the content provided by the user
        //Return all the new information about the project back to the user
        const results = await db.query(
            `
                INSERT INTO comments
                (
                    ticket_id, user_id, content
                )
                VALUES ($1, $2, $3)
                RETURNING *
            `, [ticketId, userId, commentInfo.content])

        //Retrieve the new comment information and store it
        //Run a separate query to add the comment id to the ticket's comments array
        const comment = results.rows[0]
        Tickets.addCommentToTicket(comment.id, ticketId)

        //If successful, return the new comment information
        return comment
    }









    static async addCommentToTicket(commentId, ticketId)
    {
        //ERROR CHECKING - Check if a valid comment id and ticket id has been provided; If not, throw a bad request detailing the missing id
        if(!commentId)
        {
            throw new BadRequestError(`Missing the comment id!`)
        }
        else if(!ticketId)
        {
            throw new BadRequestError(`Missing the ticket id!`)
        }

        //MAIN QUERY - Update the ticket's informaiton with the new comment id by apppending the new comment id into the existing array of comment ids
        //Check that the comment id is being inserted to the correct ticket by comparing the ids
        const results = await db.query(
            `
                UPDATE tickets
                SET comments = ARRAY_APPEND(comments, $1)
                WHERE id = $2
            `, [commentId, ticketId])
    }










    static async deleteComment({ticketId, commentId, user})
    {
        if(!ticketId)
        {
            throw new BadRequestError(`Missing the ticket id from request!`)
        }
        else if(!commentId)
        {
            throw new BadRequestError(`Missing the comment id from the request!`)
        }

        const userId = await Teams.fetchUserId(user.email)
        const projectId = await db.query(`SELECT project_id FROM tickets WHERE tickets.id = $1`, [ticketId])

        const validAccess = await Tickets.validUserAccess(projectId.rows[0].project_id, userId)
        if(!validAccess)
        {
            throw new NotFoundError(`Sorry, can not access this comment!`)
        }


        const results = await db.query(
             `
                DELETE FROM comments
                WHERE id = $1 
             `, [commentId])

        Tickets.deleteCommentFromTicket({commentId, ticketId})
    }









    static async deleteCommentFromTicket({commentId, ticketId})
    {
        const results = await db.query(
            `
                UPDATE tickets
                SET comments = (SELECT ARRAY_REMOVE(comments, $2))
                WHERE id = $1
            `, [ticketId, commentId])
    }








    static async updateComment()
    {
        //Function to update comment
    }

}


module.exports = Tickets