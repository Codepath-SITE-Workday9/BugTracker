const express = require("express")
const router = express.Router()

//POST REQUEST TO LOG A USER INTO THEIR ACCOUNT
router.post("/login", async (req,res,next) => {
    try
    {
        //Take in email and password to authenticate user
    } 
    catch(error)
    {
        next(error)
    }
})





//POST REQUEST TO REGISTER A USER TO THE DATABASE
router.post("/register", async (req,res,next) => {
    try
    {
        //Take in email, full name, and password
        //Create new user in the database
    } 
    catch(error)
    {
        next(error)
    }
})





//GET REQUEST TO AUTHORIZE THE IDENTITY OF THE USER
router.get("/me", async (req,res,next) => {
    try
    {
        //Authenticates and authorizes the user
    } 
    catch(error)
    {
        next(error)
    }
})


//Export all the login, register, and me routes
module.exports = router