//IMPORT THE JSON WEB TOKENS PACKAGE, THE SECRET KEY FROM CONFIG AND THE TOKENS FILE FOR TESTING
const jwt = require('jsonwebtoken')
const tokens = require("./tokens")
const {SECRET_KEY} = require('../config')




//RUNNING THE TOKEN.JS FILE TO CHECK FOR TOKEN GENERATION AND VERIFICATION WITH INCORRECT KEYS
describe("Sign and Verify Tokens", () => {

    //Test whether a token is generated for a user when the secret key is provided and verify the token
    test("Signing and verifying token with secret key works", () => {
        //Create an object with a test username
        const claims = {username: "test_user"}
        //Generate a token for this user for authorization purposes
        const token = tokens.generateToken(claims)
        //Decode and validate the token of the user
        const decoded = tokens.validateToken(token)
        
        //Verify that the claims of the user is returned and the token's issued at is equal to a number and expires is a number
        expect(decoded).toEqual({
            ...claims,
            iat: expect.any(Number),
            exp: expect.any(Number)
        })
    })


    

    //Test whether the the tokens file will throw an error when the wrong secret key is provided to verify the token
    test("Signing token with secret key and verifying token with incorrect key throws error", () => {
        //Create an object with the test username
        const claims = {username: "test_user"}
        //Generate a token for the user for authorization pruposes
        const token = tokens.generateToken(claims)
        console.log("Entered this test")

        //Verify the user's token with the wrong key
        //Check that the method throws an error that comes directly from the JWT file
        try
        {
            jwt.verify(token, "INCORRECT_KEY")
        }
        catch(error)
        {
            expect(error instanceof jwt.JsonWebTokenError).toBeTruthy()
        }
    })
})