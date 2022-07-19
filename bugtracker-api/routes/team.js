//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Teams = require("../models/teams")
const security = require("../middleware/security")




//FUNCTION TO LIST ALL THE TEAMS A USER BELONGS TO 
router.get("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Grab the user from the local server
        //Get a list of all the teams a user belongs to by calling Teams Class
        //Return a the list back to the Client
        const {user} = res.locals.user
        const teamList = await Teams.listAllTeams({user})
        return res.status(200).json({teamList: teamList})
    }
    catch(error)
    {
        next(error)
    }
})






//FUNCTION TO CREATE A NEW TEAM OF USERS (DEVELOPERS)
router.post("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Grab the user from the local server
        //Send both the user and team information provided from the Client req body and store it
        //Return a json body with the new team information
        const {user} = res.locals
        const team = await Teams.createTeam({user: user, teamInfo: req.body})
        return res.status(201).json({team: team})
    }
    catch(error)
    {
        next(error)
    }
})





//FUNCTION TO RETURN A SPECIFIC TEAM BY THEIR ID
router.get("/:teamId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Extract the teamId from the url parameters
        //fetch the team information using only the teamId and store it
        //Return the team information back to the Client

        const {teamId} = req.params
        const team = Teams.fetchTeamById(teamId)
        return res.status(200).json({team: team})
    }
    catch(error)
    {
        next(error)
    }
})





//FUNCTION TO ADD A NEW MEMBER TO A TEAM
router.patch("/:teamId/add", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Extract the team id from the url parameters
        //Send the id of the new user and the team id to input new member to the team
        //Send the new information to the client
    }
    catch(error)
    {
        next(error)
    }
})




//MODULE EXPORTS
module.exports = router