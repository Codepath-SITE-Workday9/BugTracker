//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Teams = require("../models/teams")
const security = require("../middleware/security")




//FUNCTION THAT FETCHES ALL PROJECTS FOR A USER
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

//FUNCTION THAT CREATES A NEW PROJECT
router.post("/", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //
    }
    catch(error)
    {
        next(error)
    }
})


//FUNCTION THAT FETCHES DETAILS FOR SPECIFIC TICKET
router.get("/:projectId", security.requireAuthenticatedUser, async(req,res,next) => {
    try
    {
        //
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
        //
    }
    catch(error)
    {
        next(error)
    }
})




//MODULE EXPORTS
module.exports = router