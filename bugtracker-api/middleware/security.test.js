const security = require("./security")
const {UnauthorizedError} = require("../utils/errors")

describe("Security Middleware", () => {
    describe("Test requireAuthenticatedUser", () => {
        test("Function does not throw an error when user is present", () => {
            expect.assertions(1)
            const req = {}
            const res = {locals: {user: {email: "test_user@gmail.com", }}}
            const next = (error) => expect(error).toBeFalsy()

            security.requireAuthenticatedUser(req, res, next)
        })

        test("Function throws an unauthorized error when user does not exist", () => {
            expect.assertions(1)
            const req = {}
            const res = {locals : {}}
            const next = (error) => expect(error instanceof UnauthorizedError).toBeTruthy()

            security.requireAuthenticatedUser(req, res, next)
        })
    })
})