//IMPORT EXPRESS, ROUTER, AND SECURITY MIDDLEWARE
const express = require("express")
const router = express.Router()
const Teams = require("../models/teams")
const security = require("../middleware/security")




//
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




//MODULE EXPORTS
module.exports = router