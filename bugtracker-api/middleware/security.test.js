//IMPORTING THE SECURITY MIDDLEWARE AND UNAUTHORIZED ERROR HANDLING
const security = require("./security")
const {UnauthorizedError} = require("../utils/errors")


//SECURITY MIDDLEWARE TEST TO ASSURE THAT UNAUTHORIZED ERRORS ARE THROWN WHEN A USER DOES NOT EXIST AND DOES NOT THROW ERROR WHEN USER EXISTS
describe("Security Middleware", () => {
    
    //Test the requireAuthenticatedUser function from Seucrity middleware
    describe("Test requireAuthenticatedUser", () => {


        
        //Test that function does not throw an error when a user exists within the database
        test("Function does not throw an error when user is present", () => {
            //Expect that only one assertion/callback is made to the function
            expect.assertions(1)
            //Send an empty request and response with the user's email stored in the local server
            const req = {}
            const res = {locals: {user: {email: "test_user@gmail.com", }}}
            //Assure that the function throws no errors because the user exists within the local server
            const next = (error) => expect(error).toBeFalsy()

            //Call the requireAuthenticatedUser function to test that no error is thrown
            security.requireAuthenticatedUser(req, res, next)
        })




        //Test that the function throws an unauthorized error when the user can not be found in the database
        test("Function throws an unauthorized error when user does not exist", () => {
            //Expect that only one assertion/callback is made to the function
            expect.assertions(1)
             //Send an empty request and response with no user in the local server
            const req = {}
            const res = {locals : {}}
            //Assure that the function throws an unauthorized error because the user does not exist and therefore, can not access any information
            const next = (error) => expect(error instanceof UnauthorizedError).toBeTruthy()

            //Call the requireAuthenticatedUser function to test that an unauthorized error is thrown
            security.requireAuthenticatedUser(req, res, next)
        })
    })
})