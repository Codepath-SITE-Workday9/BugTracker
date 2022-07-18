const {UnauthorizedError} = require("../utils/errors")

class User {
    static async login(credentials)
    {
        //Submit user email and password
        //If field is missing, throw an error
        //Look up the user in the db
        //If found, compare submitted password with the one in the db
        //If match, return the user
        //If anything goes wrong, throw unauthorized error

        throw new UnauthorizedError("Invalid email and password combo")
    }

    static async register(credentials)
    {
        //Submit user email, password, and fullname
        //If fields are missing, throw an error
        //Make sure their are no duplicate users with same email
        //If so, throw an error

        //Hash the password, take user's email and lowercase it
        //Create a new user with all this info
        //Return the user
    }
}

module.exports = User