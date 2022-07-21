//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Projects = require("../models/projects")
const security = require("../middleware/security")




//FUNCTION THAT FETCHES ALL PROJECTS FOR A USER
router.get("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the listallProjects function to get a list of all the projects a user is a member of or creator
        const projectList = await Projects.listAllProjects({user})

        //Return the list of all the projects if successful
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
        //Retrieve the user information from the local server
        const {user} = res.locals

        //Call the createProject function to add a new project to the database using user info and new project info
        //Request body must have name, description, imageUrl, tickets and teams
        const project = await Projects.createProject({user: user, projectInfo: req.body})
        
        //Return the new project information if successful
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
        //Retrieve the project id from the given url
        const {projectId} = req.params

        //Retrieve the user infromation from the local server
        const {user} = res.locals

        //Call the fetchProjectById function to find specific project information
        //Must provide the project id from the url
        const project = await Projects.fetchProjectById({projectId: projectId, user: user})
        
        //Return the specific project information if successful
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
        //Retrieve the project id from the given url   
        const {projectId} = req.params

        //Retrieve the user infromation from the local server
        const {user} = res.locals

        //Call the updateProjectInfo function to update the project information
        //Not allowed to update the tickets or teams (will throw an error)
        //Request body have the name of the field to update and the new field value
        const updatedProject = await Projects.updateProjectInfo({projectId: projectId, projectInfo: req.body, user: user})
        
        //Return the new project information if successful
        return res.status(200).json({project: updatedProject})
    }
    catch(error)
    {
        next(error)
    }
})




//MODULE EXPORTS
module.exports = router