//IMPORTED DATABASE, ERROR HANDLING, USER MODELS, AND DATABASE COMMANDS FROM COMMON.JS
const db = require("../db")
const {NotFoundError, BadRequestError} = require("../utils/errors")
const Teams = require("./teams")
const Users = require("./user")
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach} = require("../tests/common")



//DATABASE COMMANDS - Assures that everytime an action occurs with the database which in this case is a user insertion,
//Rollback all actions perfomed with the datbase once testing ends
//Ensures that test can be used repeatedly without the ned to keep error checking working models
beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)






//Information to create a new team
const newTeam = {
    name : "Development Team",
    members : ["random@gmail.com", "user@gmail.com", "test@gmail.io"],
    projects: [1]
}


//Information to create a new test user
const newUser = {
    email: "test@gmail.io",
    fullName: "Another Test User"
}






//TEST ALL THE TEAMS MODELS FOR CREATING A TEAMS, LIST ALL TEAMS, FETCH TEAM BY ID, AND ADDING NEW MEMBER TO TEAM
describe("Test Teams Models", () => {

    //TEST THE CREATE TEAM MODEL FOR BAD REQUEST ERRORS WHEN MISSING FIELDS AND PROPER CREATE TEAM INFORMATION
    describe("Test Team Creation", () => {



        //Test that a user can create a new team by providing the proper information as an authenticated user
        test("User can create a team with the proper information", async () => {
            //Register a new test user into the database with proper credentials
            const registerUser = await Users.register({...newUser, password: "pw"})
            //Create a new team by providing the test user information and new team object information
            const createTeam = await Teams.createTeam({user: registerUser, teamInfo: newTeam})

            //The createTeam function should return a response containing the id, name, id of members, creator id of test user, and projects id
            expect(createTeam).toEqual({
                "id": expect.any(Number),
		        "name": "Development Team",
		        "members": [1,2, registerUser.id],
		        "creator_id": expect.any(Number),
		        "projects": [1]
            })
        })




        //Test that a user gets a BadRequestError if missing any required field from their request
        test("Creating a team with missing fields with throw a BadRequestError", async () => {
            //Make sure that there is only one assertion being received when the function executes
            expect.assertions(1)
            
            //Register the test user into the database and then attempt to create a new team with the test user info and an object with missing projects field
            //Should catch a BadRequestError because the projects field is missing from the request
            try
            {
                const registerUser = await Users.register({...newUser, password: "pw"})
                const createTeam = await Teams.createTeam({user: registerUser, teamInfo: {name: newTeam.name, members: newTeam.members}})
            }
            catch(error)
            {
                expect(error instanceof BadRequestError).toBeTruthy()
            }
        })
    })



    //TEST THAT LIST TEAMS FUNCTION TO CHECK THAT A USER CAN RECEIVE A LIST OF ALL THE TEAMS THEY ARE A PART OF AND AN EMPTY LIST IF THEY ARE NOT A PART OF ANY
    describe("Test List All Teams", () => {

        //Test that a user can retrieve a list of all the teams they are a member of 
        test("User retrieves a list of all teams they are a member of", async () => {
            //Register the new test user into the database
            const registerUser = await Users.register({...newUser, password: "pw"})
            //Create a new team where the test user is a member of
            const createTeam = await Teams.createTeam({user: registerUser, teamInfo: newTeam})

            //Call the listAllTeams function to get a list of all the teams the user is a member of
            const listTeams = await Teams.listAllTeams({user: registerUser})

            //JSON response should include only one team that has the user as a member
            expect(listTeams).toEqual(
                [{
                    "id": expect.any(Number),
                    "name": "Development Team",
                    "members": [1,2, registerUser.id],
                    "creator_id": expect.any(Number),
                    "projects": [1]
                }]
            )
        })




        //Test that a user retrieve an empty list of teams if they are not a member of any team
        test("User retrieves empty list of teams if they are not a member of any team", async () => {
            //Register the test user into the database
            const registerUser = await Users.register({...newUser, password: "pw"})
            //Create a new team where the test user is not a member
            const createTeam = await Teams.createTeam({user: registerUser, teamInfo: {name: newTeam.name, projects: newTeam.projects, members: ["random@gmail.com", "user@gmail.com"]}})

            ///Call the listAllTeams function to get a list of all the teams a user is a part of
            const listTeams = await Teams.listAllTeams({user: registerUser})

            //JSON response should return an empty array because user is not part of any team
            expect(listTeams).toEqual([])
        })
    })



    describe("Fetch Team by Id Function", () => {
        test("User can retrieve information about a specific team if they are a creator/team member", async () => {
            
        })

        test("Gets a not found error if they are neither a creator or member of team", async () => {
            
        })
    })
})