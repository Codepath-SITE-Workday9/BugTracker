//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Statistics = require("../models/statistics")
const security = require("../middleware/security")



//FUNCTION TO OBTAIN THE VELOCITY OF A TEAM IN TERMS OF COMPLETING TICKETS BASED ON COMPLEXITY
router.get("/velocity", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Take in the user information
        //Return average statistics about the team's a user is a part of
    }
    catch(error)
    {
        next(error)
    }
})

//FUNCTION TO OBTAIN THE VELOCITY OF A TEAM IN TERMS OF COMPLETING TICKETS BASED ON COMPLEXITY
router.get("/statistics", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        const {user} = res.locals
        const statistics = await Statistics.fetchTicketStatistics({user: user})
        return res.status(200).json({statistics: statistics})
    }
    catch(error)
    {
        next(error)
    }
})



//MODULE EXPORTS
module.exports = router