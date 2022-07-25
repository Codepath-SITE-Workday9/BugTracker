//Importing express / app
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
//Import Error Handling File
const {NotFoundError} = require("./utils/errors")
//Import Security middleware
const security = require('./middleware/security')
//Importing Models and Routes
const authRoutes = require('./routes/auth')
const teamRoutes = require('./routes/team')
const projectRoutes = require('./routes/project')
const ticketRoutes = require('./routes/ticket')




//Create Express Application
const app = express()




//APP USE - Parse incoming request bodies
app.use(cors())
app.use(express.json())
app.use(morgan('tiny'))
//APP USE - Security Middleware to authenticate user and create JWTs
app.use(security.extractUserFromJwt)
//APP USE - All authorization/registration routes including login, register, and me
app.use("/auth", authRoutes)
//APP USE - All teams routes including list all teams, creating a team, and add new members to teams
app.use("/team", teamRoutes)
//APP USE - All project routes including list all projects, creating a project, getting detailings for a project, and updating project info
app.use("/project", projectRoutes)
//APP USE - All ticket routes including list all tickets, create a new ticket, getting ticket details, update ticket information, add comments
app.use("/ticket", ticketRoutes)





//Server Health Check
app.get('/', async(req,res,next) => {
    res.status(200).json({"ping":"pong"})
})




//ERROR HANDLING - Not Found
app.use((req,res,next) => {
    return next(new NotFoundError())
})

app.use((error, req, res, next) => {
    const status = error.status || 500
    const message = error.message
    return res.status((status)).json({
        error: {message, status}
    })
})



//MODULE EXPORTS
module.exports = app