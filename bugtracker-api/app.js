//Importing express / app
const express = require('express')
const morgan = require('morgan')

//Create Express Application
const app = express()

//APP USE - Parse incoming request bodies
app.use(express.json())
app.use(morgan('tiny'))


//Server Health Check
app.get('/', async(req,res,next) => {
    res.status(200).json({"ping":"pong"})
})

//MODULE EXPORTS
module.exports = app