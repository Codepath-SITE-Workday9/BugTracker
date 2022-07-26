const db = require("../db")
const {UnauthorizedError, BadRequestError} = require("../utils/errors")
const User = require("./user")

const newUser = 
{
    email: "testUser@gmail.com",
    fullName: "Test User"
}

describe("User", () => {
    describe("Test User Registration", () => {
        test("User can register with proper credentials", async () => {
            const user = await User.register({ ...newUser, password: "pw"})
            expect(user).toEqual({
                id: expect.any(Number),
                email: newUser.email,
                fullName: newUser.fullname,
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

afterAll(async () => {
    await db.end()
})