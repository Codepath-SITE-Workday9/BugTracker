//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Projects = require("../models/projects")
const security = require("../middleware/security")
const Teams = require("../models/teams")




//FUNCTION THAT FETCHES ALL PROJECTS FOR A USER
router.get("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Get the user info from res.locals
        //call the listAllProject function and send in the user
        //Return the list of all the projects
        const {user} = res.locals
        const projectList = await Projects.listAllProjects({user})
        return res.status(200).json({projectList: projectList})
    }
    catch(error)
    {
        next(error)
    }
})

//FUNCTION THAT CREATES A NEW PROJECT
router.post("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information
        //Call the createProject function to create a new project
        //Take in all project information
        //Return the new project information
        const {user} = res.locals
        const project = await Projects.createProject({user: user, projectInfo: req.body})
        return res.status(201).json({project: project})
    }
    catch(error)
    {
        next(error)
    }
})


//FUNCTION THAT FETCHES DETAILS FOR SPECIFIC PROJECT BY THEIR ID
router.get("/:projectId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the teams id from the url
        //Get the user from the local server
        //call  fetchProjectbyId function to find specific project info
        //Return the specific project info
        const {projectId} = req.params
        const {user} = res.locals
        const project = await Projects.fetchProjectById({projectId: projectId, user: user})
        return res.status(200).json({project: project})
    }
    catch(error)
    {
        next(error)
    }
})

//FUNCTION THAT UPDATES A PROJECT'S INFORMATION
router.patch("/:projectId/update", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the team id from the url
        //Get the user from the local server
        //Call the updateProjectInfo function to update specific project fields
        //Req body should have the name of the field to update and the info to update it
        //Return the updated project info
        //Add a random comment
    }
    catch(error)
    {
        next(error)
    }
})




//MODULE EXPORTS
module.exports = router