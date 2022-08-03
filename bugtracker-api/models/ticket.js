const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")
const Teams = require("./teams")

class Tickets 
{
    
    //FUNCTION TO LIST ALL THE TICKETS ASSOCIATED WITH A USER
    static async listAllTickets({user})
    {
    //Run a separate query to get the id of the user using the email provided by the local server
    const userId = await Teams.fetchUserId(user.email)


    //At this point, user should be someone with valid access to project information with a valid projectId
    //Run a main query to get all the tickets that belong to a particular project by comparing the project id with the given id
    const results = await db.query(
        `
            SELECT *
            FROM tickets
            WHERE $1 = any(tickets.developers) OR $1 = tickets.creator_id
            ORDER BY tickets.id ASC
        `, [userId])

    //Return a list of all the tickets associated with a project
    return results.rows
}








    //FUNCTION TO LIST ALL THE TICKETS ASSOCIATED WITH A PROJECT
    static async listAllProjectTickets({user, projectId})
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
                OR ($2 = any(teams.members)))
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








    //FUNCTION TO CREATE A NEW COMMENT ON A TICKET
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








    //FUNCTION TO ADD A COMMMENT TO THE TICKET'S COMMENT FIELD
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









    //FUNCTION TO DELETE A COMMENT FROM THE DATABASE AND A TICKET
    static async deleteComment({ticketId, commentId, user})
    {
        //ERROR CHECKING - Check if the ticketId and commentId has been provided by the user through the req.params
        //If not, throw a bad request detailing the missing field
        if(!ticketId)
        {
            throw new BadRequestError(`Missing the ticket id from request!`)
        }
        else if(!commentId)
        {
            throw new BadRequestError(`Missing the comment id from the request!`)
        }

        //Run a separate query to get the id of the user using the email from the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a query to check if a user has valid access to the comment (access granted if user is the creator of the comment)
        //If no comment information is returned (undefined), then throw a not found error stating that the user can not access the comment info
        const validAccess = await Tickets.validCommentAccess(commentId, userId)
        if(!validAccess)
        {
            throw new NotFoundError(`Can not access this comment!`)
        }


        //MAIN QUERY - Run a query to delete the comment from the database by matching the commentId to existing ids in the DB
        const results = await db.query(
             `
                DELETE FROM comments
                WHERE id = $1 
             `, [commentId])

        //MIAIN QUERY - Run another query to delete the comment from the ticket details and update the new ticket info to reflect that deletion
        //Return nothing back to the user except the 204 status meaning that the request was successful but no information returned
        Tickets.deleteCommentFromTicket({commentId, ticketId})
    }








    //FUNCTION TO DELETE A COMMENT FROM A TICKET
    static async deleteCommentFromTicket({commentId, ticketId})
    {
        //Using the commentId and ticketId from the req.params, run a query to update the ticket details to remove the comment from existing comments array
        //First, compare the id of the ticket and then update the comments field with a new field generated by removing the commentId from the existing array
        const results = await db.query(
            `
                UPDATE tickets
                SET comments = (SELECT ARRAY_REMOVE(comments, $2))
                WHERE id = $1
            `, [ticketId, commentId])
    }










    //FUNCTION TO UPDATE SPECIFIC COMMENT INFORMATION
    static async updateComment({ticketId, commentId, user, commentInfo})
    {
        //ERROR CHECKING - Check if the new comment information has been provided by the user in the request body
        //If not, throw a bad request error detailing the missing information
        if(!commentInfo)
        {
            throw new BadRequestError(`New Comment Information is missing!`)
        }

        //Run a separate query to get the id of the user using the email from the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a separate query to check if a user has valid access to update a comment (only if they are the creator of the comment
        //If no information sent back (undefined), return a not found error stating that user can not access the comment information to update)
        const validAccess = await Tickets.validCommentAccess(commentId, userId)
        if(!validAccess)
        {
            throw new NotFoundError(`Can not access this comment!`)
        }


        //Get the names of all the fields the user wants to update by extracting the property names from the commentInfo object; Returned as array
        const propertyNames = Object.keys(commentInfo)

        //MAIN QUERY - Loop through all the property names of the fields the user wishes to update and run an update query
        //First, compare the id of the comment to find the comment the user wants to change and then update the value of the existing field
        //If not successful, throw a bad request error saying that the field was invalid
        propertyNames.forEach(async(field) => {
            const results = await db.query(
                `
                    UPDATE comments
                    SET ${field} = $1
                    WHERE id = $2
                    RETURNING *
                `, [commentInfo[field], commentId])
            
            const comment = results.rows[0]
            if(!comment)
            {
                throw new BadRequestError(`Unable to update comment! The ${field} is invalid!`)
            }
        })

        //Get the new information of the comment and store it
        //If successful, return the updated comment information back to the user
        const updatedComment = await Tickets.fetchCommentById({ticketId, commentId, user})
        return updatedComment
    }










    //FUNCTION TO DETERMINE IF A USER IS ABLE TO DELETE OR UPDATE A COMMENT IF THEY ARE THE CREATOR OF THE COMMENT
    static async validCommentAccess(commentId, userId)
    {
        //ERROR CHECKING - Check if the comment id and user id has been provided by the req params; If not, throw an error stating the missing field
        if(!commentId)
        {
            throw new BadRequestError(`Missing the comment Id !`)
        }
        else if(!userId)
        {
            throw new BadRequestError(`Missing the user id!`)
        }


        //MAIN QUERY - Check that the user is the creator of the comment by finding the specific comment by id and then comparing the user id with the one provided
        const results = await db.query(
            `
                SELECT *
                FROM comments
                WHERE id = $1 AND user_id = $2
            `, [commentId, userId])


        //If successful, return the comment information. IF not, return undefined
        return results.rows[0]
    }









    //FUNCTION TO RETREIVE SEPCIFIC INFORMATION ABOUT A COMMMENT USING THE GIVEN COMMENT ID
    static async fetchCommentById({ticketId, commentId, user})
    {
        //ERROR CHECKING - Check that a vlaid commentId is provided by the user through the req params
        if(!commentId)
        {
            throw new BadRequestError(`Missing the comment id from request!`)
        }

        //Run a separate query to get the id of the user using the email from the local server
        const userId = await Teams.fetchUserId(user.email)

        //Run a separate query to get the projectId of the ticket
        const projectId = await db.query(`SELECT project_id FROM tickets WHERE tickets.id = $1`, [ticketId])

        //Run a separate query to check whether the user has valid access to the tickets, and therefore, the comments by assuring that the user is a creator/member of the project
        //If not, validAcess will be undefined and throw a not found errror detailing that the user does not have access to the comment 
        const validAccess = await Tickets.validUserAccess(projectId.rows[0].project_id, userId)
        if(!validAccess)
        {
            throw new NotFoundError("Sorry, can not access this comment!")
        }


        //MAIN QUERY - Get the comment information by comparing the provided id against ids for comments in the database and then return all the information associated with the comment
        const results = await db.query(
            `
                SELECT *
                FROM comments
                WHERE id = $1
            `, [commentId])

        //If successful, return the comment information 
        return results.rows[0]
    }






    //FUNCTION TO FETCH ALL THE MEMBER NAMES FOR A SPECIFIC TICKET
    static async fetchTicketMembersById({ticketId})
    {
        //ERROR CHECKING - Ensure that a ticketId is provided
        if(!ticketId)
        {
            throw new BadRequestError("No ticket id was provided!")
        }

        //Run a query to get the names of all the developers assigned to a ticket
        const results = await db.query(
            `
                SELECT full_name
                FROM users
                WHERE id = any((SELECT UNNEST(developers) FROM tickets WHERE id = $1))
            `, [ticketId])

        
        //Create an empty array to store all the member's names
        //Map through the results of the query (object of fullNames) and check if there are duplicates before adding the name to the memberNames
        let memberNames = []
        results.rows.map((member) => {
            if(!memberNames.includes(member.full_name))
            {
                memberNames.push(member.full_name)
            }
        })

        //Return a string of all the member names
        return memberNames.join(", ")
    }

}


module.exports = Tickets