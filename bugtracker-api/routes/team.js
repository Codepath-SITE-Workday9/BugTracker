//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Teams = require("../models/teams")
const security = require("../middleware/security")




//FUNCTION TO LIST ALL THE TEAMS A USER BELONGS TO 
router.get("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals
        //Call the listTeams function to get a list of all the teams a user created or is a member of
        const teamList = await Teams.listAllTeams({user})
        //Return the list of all the teams if successful
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
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the create team function to add a new team to the database using the user information and the new team info
        //Request body must have the name of the team, the members of the team, and the projects of a team
        const team = await Teams.createTeam({user: user, teamInfo: req.body})

        //Return the new team information if successful
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
        //Retrieve the team id from the given url
        const {teamId} = req.params

        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the fetchTeamById function to find specific team information
        //Must provided the team id from the url
        const team = await Teams.fetchTeamById({teamId: teamId, user: user})

        //Return the specific team information if successful
        return res.status(200).json({team: team})
    }
    catch(error)
    {
        next(error)
    }
})





//FUNCTION TO ADD A NEW MEMBER TO A TEAM
router.patch("/:teamId/add", security.requireAuthenticatedUser, async(req,res,next) => {
    console.log("Team trying router: ", req.body)
    try
    {
        //Retrieve the team id from the given url
        const {teamId} = req.params
        //Retrieve the user information from the local server
        const {user} = res.locals
        //Call the addNewTeamMember function to update the members of a team
        //Request body must have the new member's email; If not, the request will be unsuccessful
        const updatedTeam = await Teams.addNewTeamMember({teamId: teamId, newMember: req.body, user: user})

        //Return the new team information if successful
        return res.status(200).json({team: updatedTeam})
    }
    catch(error)
    {
        next(error)
    }
})






//FUNCTION TO ADD A NEW MEMBER TO A TEAM
router.get("/user/:email", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the email param from the given url
        const {email} = req.params;
        //Run the fetchUserById function to check if user exists in database using the email provided in request body
        const validUser = await Teams.fetchUserId(email)

        //Return the userId if successful
        return res.status(200).json({userId: validUser})
    }
    catch(error)
    {
        next(error)
    }
})




//MODULE EXPORTS
module.exports = router