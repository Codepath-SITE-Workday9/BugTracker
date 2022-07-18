const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")

class Teams
{
    static async listAllTeams()
    {
        //List all teams a user belongs to
    }

    static async createTeam()
    {
        //Create a new team
    }

    static async fetchTeamById()
    {
        //Returns a sepcific team by id
    }

    static async addNewTeamMember()
    {
        //Add a new member to a team
    }
}

module.exports = Teams