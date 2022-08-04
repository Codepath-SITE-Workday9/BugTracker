//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Tickets = require("../models/ticket")
const security = require("../middleware/security")


//FUNCTION TO LIST ALL THE TICKETS FOR A USER  
router.get("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals
        //Call the listAllTickets function to get a list of all the tickets from a specific project
        //Request body should have the projectId
        const ticketList = await Tickets.listAllTickets ({user: user})
        //Return the list of all the tickets if successful
        return res.status(200).json({ticketList: ticketList})
    }
    catch(error)
    {
        next(error)
    }
})

//FUNCTION TO LIST ALL THE TICKETS FOR A SELECTED PROJECT 
router.get("/project/:projectId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals
        //Call the listAllTickets function to get a list of all the tickets from a specific project
        //Request body should have the projectId
        const ticketList = await Tickets.listAllProjectTickets({user: user, projectId: req.params.projectId})
        //Return the list of all the tickets if successful
        return res.status(200).json({ticketList: ticketList})
    }
    catch(error)
    {
        next(error)
    }
})





//FUNCTION TO CREATE A NEW TICKET
router.post("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the createTicket function to add a new ticket to the database and update projects table
        //Request must have the developers (array of emails), projectId, title, description, category, priority, status and complexity
        const ticket = await Tickets.createTicket({user: user, ticketInfo: req.body})
        
        //Return the new ticket information if successful
        return res.status(201).json({ticket: ticket})
    }
    catch(error)
    {
        next(error)
    }
})






//FUNCTION TO FETCH DETAILS FOR A SPECIFIC TICKET
router.get("/:ticketId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the ticket id from the given url
        const {ticketId} = req.params

        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the fetchTicketById to find specific ticket information
        //Must provide the ticket id from the url
        const ticket = await Tickets.fetchTicketbyId({ticketId: ticketId, user: user})
        
        //Return the specific ticket information if successful
        return res.status(200).json({ticket: ticket})
    }
    catch(error)
    {
        next(error)
    }
})






//FUNCTION TO UPDATE TICKET INFORMATION
router.patch("/:ticketId/update", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the ticket id from the given url
        const {ticketId} = req.params

        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the updateTicketInfo function to update the ticket information
        //Request body have the name of the field to update and new field value
        const updatedTicket = await Tickets.updateTicketInfo({ticketId: ticketId, ticketInfo: req.body, user: user})
        
        //Return the new ticket information if successful
        return res.status(200).json({ticket: updatedTicket})
    }
    catch(error)
    {
        next(error)
    }
})







//FUNCTION TO CREATE A NEW COMMENT FOR A SPECIFIC TICKET
router.post("/:ticketId/comment", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the ticket id from the given url
        const {ticketId} = req.params

        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the createComment function to create a new comment on a ticket
        //Request body must have the the comment content and ticketId from req params
        const comment = await Tickets.createComment({ticketId: ticketId, user: user, commentInfo: req.body})

        //Return the new comment information if successful
        return res.status(200).json({comment: comment})
    }
    catch(error)
    {
        next(error)
    }
})








//FUNCTION TO DELETE A COMMENT FROM A TICKET
router.delete("/:ticketId/:commentId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the ticket id from the given url
        const {ticketId} = req.params

        //Retrieve the comment id from the given url
        const {commentId} = req.params

        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the deleteComment function to delete a comment from a ticket
        const deleteComment = await Tickets.deleteComment({ticketId: ticketId, commentId: commentId, user: user})

        return res.status(204).json()
    }
    catch(error)
    {
        next(error)
    }
})






//FUNCTION TO UPDATE A COMMENT ON A TICKET
router.patch("/:ticketId/:commentId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the ticket id from the given url
        const {ticketId} = req.params

        //Retrieve the comment id from the given url
        const {commentId} = req.params

        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the updateComment function to update comment information on a ticket
        //Request body should have the name of the field to update and the new field value
        const updatedComment = await Tickets.updateComment({ticketId: ticketId, commentId: commentId, user: user, commentInfo: req.body})

        //Return the new comment information if successful
        return res.status(200).json({comment: updatedComment})
    }
    catch(error)
    {
        next(error)
    }
})






//FUNCTION TO FETCH SPECIFIC COMMENT INFORMATION BY ID
router.get("/:ticketId/:commentId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the ticket id from the given url
        const {ticketId} = req.params

        //Retrieve the comment id from the given url
        const {commentId} = req.params

        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the fetchCommentById function to fetch specific comment information on a ticket
        const comment = await Tickets.fetchCommentById({ticketId: ticketId, commentId: commentId, user: user})

        //Return the new comment information if successful
        return res.status(200).json({comment: comment})
    }
    catch(error)
    {
        next(error)
    }
})








//FUNCTION TO GET ALL THE MEMBERS NAMES FOR A TICKET
router.get("/:ticketId/team/members", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the ticket id from the given url
        const {ticketId} = req.params

        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the fetchTicketMembersById function to fetch the names of all the members of a ticket
        const members = await Tickets.fetchTicketMembersById({ticketId: ticketId, user: user})

        //Return the member information if successful
        return res.status(200).json({ticketMembers: members})
    }
    catch(error)
    {
        next(error)
    }
})



//MODULE EXPORTS
module.exports = router