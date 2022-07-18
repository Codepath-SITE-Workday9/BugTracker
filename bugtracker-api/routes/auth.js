const express = require("express")
const router = express.Router()

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

router.post("/me", async (req,res,next) => {
    try
    {
        //Authenticates and authorizes the user
    } 
    catch(error)
    {
        next(error)
    }
})

module.exports = router