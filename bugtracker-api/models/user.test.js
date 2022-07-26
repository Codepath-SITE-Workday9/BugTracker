const db = require("../db")
const {UnauthorizedError, BadRequestError} = require("../utils/errors")
const User = require("./user")
const {commonBeforeAll, commonBeforeEach, commonAfterAll, commonAfterEach} = require("../tests/common")


beforeAll(commonBeforeAll)
afterAll(commonAfterAll)
beforeEach(commonBeforeEach)
afterEach(commonAfterEach)

const newUser = 
{
    email: "test_user@gmail.com",
    fullName: "Test User"
}

describe("User", () => {
    describe("Test User Registration", () => {
        test("User can register with proper credentials", async () => {
            const user = await User.register({ ...newUser, password: "pw"})
            expect(user).toEqual({
                id: expect.any(Number),
                email: newUser.email,
                fullName: newUser.fullName,
            })
        })

        test("Registering with duplicate email throws an error", async () => {
            expect.assertions(1)
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
})