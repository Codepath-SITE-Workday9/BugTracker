const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")

class Statistics 
{
    static async fetchTicketStatistics()
    {
        //Function to get the average statistics about tickets within all the projects
        //Number of tickets per category
        //Number of tickets per status
        //Number of tickets per priority etc.
    }

    static async fetchStatisticsByProject()
    {
        //Function to get the average statistics about tickets within a specific project
    }

    static async fetchTeamVelocity()
    {
        //Function to get the total ticket closing velocity of a team 
    }
}


module.exports = Statistics