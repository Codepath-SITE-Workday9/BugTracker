const express = require("express")
const router = express.Router()
const User = require("../models/user")

//POST REQUEST TO LOG A USER INTO THEIR ACCOUNT
router.post("/login", async (req,res,next) => {
    try
    {
        //Request will take in an email and password
        const user = await User.login(req.body)

        //Return the user when authenticated
        return res.status(200).json({user: user})
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
        //Request will take in an email, password, and full name from user
        const user = await User.register(req.body)

        //Return the user when authenticated
        return res.status(200).json({user: user})
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