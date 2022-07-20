const db = require("../db")
const {BadRequestError, NotFoundError} = require("../utils/errors")

class Projects
{
    static async listAllProjects()
    {
        //Fetches all projects for a user
    }

    static async createProject()
    {
        //Create a new project
    }

    static async fetchProjectbyId()
    {
        //Fetches specific project information
    }

    static async updateProjectInfo()
    {
        //Update a project's information
    }
}

module.exports = Projects