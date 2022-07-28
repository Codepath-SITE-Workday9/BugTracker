//IMPORT THE SUPER TEST CONFIG, APP, TOKENS, AND DATABASE CALLBACKS
const request = require("supertest")
const app = require("../app")
const tokens = require("../utils/tokens")
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach} = require("../tests/common")



//DATABASE COMMANDS - Assures that everytime an action occurs with the database which in this case is a user insertion,
//Rollback all actions perfomed with the datbase once testing ends
//Ensures that test can be used repeatedly without the ned to keep error checking working models
beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)


//Create a token for a test user using the tokens utils
const testToken = tokens.createUserJwt({email: "testUser@gmail.com"})




//TEST THE AUTH ROUTES TO ASSURE THAT A USER CAN LOGIN, REGISTER, AND AUTHENTICATE USING /AUTH/ME REQUEST
describe("Checking Auth Routes", () => {
    //Test the /auth/me route to ensure that a user can receive their information given the proper credentials and can throw an error if unauthenticated with tokens
    describe("GET REQUEST /auth/me", () => {

        
        //Test that a user can receive their profile information if they are authenticated using the tokens
        test("Authenticated user receives their profile when hitting endpoint", async () => {
            //Make a request to the route using the token generated for the test user in the authorization header
            const res = await request(app).get("/auth/me").set("Authorization", `Bearer ${testToken}`)
            //Request should send back a successful 200 status code and the user's id, email, and full name
            expect(res.statusCode).toEqual(200)
            expect(res.body.user).toEqual({
                id: expect.any(Number),
                email: "testuser@gmail.com",
                fullName: "Test User",
                imageUrl: null
            })
        })


        //Test that a user will receive an unauthenticated error if an authorization header with the user's token is not provided
        test("Unauthenticated requests throw a 401 error", async () => {
            //Send a reuqest to the route without an authorization header; Should throw an unauthenticated error
            const res = await request(app).get("/auth/me")
            expect(res.statusCode).toEqual(401)
        })
    })
})