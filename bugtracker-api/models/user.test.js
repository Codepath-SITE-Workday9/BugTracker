//IMPORTED DATABASE, ERROR HANDLING, USER MODELS, AND DATABASE COMMANDS FROM COMMON.JS
const db = require("../db")
const {UnauthorizedError, BadRequestError} = require("../utils/errors")
const User = require("./user")
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach} = require("../tests/common")





//DATABASE COMMANDS - Assures that everytime an action occurs with the database which in this case is a user insertion,
//Rollback all actions perfomed with the datbase once testing ends
//Ensures that test can be used repeatedly without the ned to keep error checking working models
beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)





//Creates a new user with email and fullName parameters
const newUser = 
{
    email: "test_user@gmail.com",
    fullName: "Test User"
}




//TEST THE USER MODELS INCLUDING REGISTER AND LOGIN FUNCTIONALITY
describe("User Models", () => {
    //Test that a user can be properly registered and will return the correct information back to the client-side
    describe("Test User Registration", () => {


        //Test that a user can be registered; Should return the id, email, and fullname of the user
        test("User can register with proper credentials", async () => {
            //Register the fake user into the database
            const user = await User.register({ ...newUser, password: "pw"})
            //Register request should return a JSON body containing the new id, email, and fullName of the user
            expect(user).toEqual({
                id: expect.any(Number),
                email: newUser.email,
                fullName: newUser.fullName,
            })
        })


        //Test that a user receives a BadRequestError if they try to register with a pre-existing email
        test("Registering with duplicate email throws an error", async () => {
            //Make sure that there is only one assertion being received when the function executes
            expect.assertions(1)

            //Register a user into the system and then re-register another user with the same email
            //Request should throw a BadRequestError detailing that the user provided a duplicate email
            try
            {
                await User.register({ ...newUser, password: "pw"})
                await User.register({ ...newUser, password: "pw"})
            }
            catch(error)
            {
                expect(error instanceof BadRequestError).toBeTruthy()
            }
        })
    })


    describe("Test User Login", () => {
        test("User can login with proper credentials", async () => {
            const registerUser = await User.register({ ...newUser, password: "pw"})
            const loginUser = await User.login({...newUser, password: "pw"})
            expect(loginUser).toEqual({
                id: expect.any(Number),
                email: newUser.email,
                fullName: newUser.fullName
            })
        })

         test("Logging in with invalid email/password combo throws unauthorized error", async () => {
            expect.assertions(1)
            try
            {
                const loginUser = await User.login({...newUser, password: "wrongPw"})
            }
            catch(error)
            {
                expect(error instanceof UnauthorizedError).toBeTruthy()
            }
         })
    })
})