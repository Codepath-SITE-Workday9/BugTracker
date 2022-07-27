//IMPORTED DATABASE, ERROR HANDLING, USER MODELS, AND DATABASE COMMANDS FROM COMMON.JS
const db = require("../db")
const {NotFoundError, BadRequestError} = require("../utils/errors")
const Teams = require("./teams")
const Users = require("./user")
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach} = require("../tests/common")
const { validUserAccess } = require("./ticket")


beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)


const newTeam = {
    name : "Development Team",
    members : ["random@gmail.com", "user@gmail.com"],
    projects: [1]
}

const newUser = {
    email: "test@gmail.io",
    fullName: "Another Test User"
}

describe("Test Teams Models", () => {
    describe("Test Team Creation", () => {
        test("User can create a team with the proper information", async () => {
            const registerUser = await Users.register({...newUser, password: "pw"})
            const createTeam = await Teams.createTeam({user: registerUser, teamInfo: newTeam})

            expect(createTeam).toEqual({
                "id": expect.any(Number),
		        "name": "Development Team",
		        "members": [1,2],
		        "creator_id": expect.any(Number),
		        "projects": [1]
            })
        })

        test("Creating a team with missing fields with throw a BadRequestError", async () => {
            expect.assertions(1)
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
})