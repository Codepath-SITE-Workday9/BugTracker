//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Tickets = require("../models/ticket")
const security = require("../middleware/security")




//FUNCTION TO LIST ALL THE TICKETS FOR A SELECTED PROJECT 
router.get("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //
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
        const {user} = res.locals
        const ticket = await Tickets.createTicket({user: user, ticketInfo: req.body})
        return res.status(201).json({ticket: ticket})
    }
    catch(error)
    {
        next(error)
    }
})




//MODULE EXPORTS
module.exports = router