//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Tickets = require("../models/ticket")
const security = require("../middleware/security")



//FUNCTION TO LIST ALL THE TICKETS FOR A SELECTED PROJECT 
router.get("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        console.log("Entered get function")
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the listAllTickets function to get a list of all the tickets from a specific project
        //Request body should have the projectId
        const ticketList = await Tickets.listAllTickets({user: user, projectId: req.body.projectId})
        
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




//MODULE EXPORTS
module.exports = router