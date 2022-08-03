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






//FUNCTION TO OBTAIN THE TICKET STATISTICS OF ALL THE PROJECTS A USER IS A CREATOR OR MEMBER OF 
router.get("/statistics", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the fetchTicketStatistics function and send in the user information to get ticket statistics for all projects
        //IF successful, will return an object containing all the tickets filtered by category, priority, and status
        //If the user is not part of any project, will return an empty array for each category
        const statistics = await Statistics.fetchTicketStatistics({user: user})

        //If successful, returns an array object containing ticket statistics for category, priority, and status for all projects
        return res.status(200).json({statistics: statistics})
    }
    catch(error)
    {
        next(error)
    }
})







//FUNCTION TO OBTAIN THE TICKET STATISTICS OF A SINGLE PROJECT A USER IS A CREATOR OR MEMBER OF
router.get("/statistics/:projectId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Retrieve the project id from the url request
        const {projectId} = req.params

        //Call the fetchStatisticsByProject function to obtain the ticket statistics for a single project if the user has valid access
        //IF successful, will return an object containing all the tickets filtered by category, priority, and status
        //If the user is not a member/creator of the request project, throws a not found error detailing invalid access
        const statistics = await Statistics.fetchStatisticsByProject({user: user, projectId: projectId})

        //If successful, returns an array object containing ticket statistics for category, priority, and status for all projects
        return res.status(200).json({statistics: statistics})
    }
    catch(error)
    {
        next(error)
    }
})







router.get("/statistics/1/progress", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the fetchTicketStatistics function and send in the user information to get ticket statistics for all projects
        //IF successful, will return an object containing all the tickets filtered by category, priority, and status
        //If the user is not part of any project, will return an empty array for each category
        const statistics = await Statistics.fetchProgressOvertime({user: user})

        //If successful, returns an array object containing ticket statistics for category, priority, and status for all projects
        return res.status(200).json({statistics: statistics})
    }
    catch(error)
    {
        next(error)
    }
})







router.get("/complexity", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the fetchComplexityOvertime function using only the user information from local server
        //And obtain an object containing all the complexity points per month, and complexity points stored into an array
        const complexity = await Statistics.fetchComplexityOvertime({user: user})

        //Return the array of complexity points if successful
        return res.status(200).json({complexity: complexity})
    }
    catch(error)
    {
        next(error)
    }
})



//MODULE EXPORTS
module.exports = router