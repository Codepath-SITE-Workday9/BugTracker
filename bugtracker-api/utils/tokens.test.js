const jwt = require('jsonwebtoken')
const tokens = require("./tokens")
const {SECRET_KEY} = require('../config')

describe("Can Sign and verify tokens", () => {
    test("Signing and verifying token with secret key works", () => {
        const claims = {username: "test_user"}
        const token = tokens.generateToken(claims)
        const decoded = tokens.validateToken(token)
        expect(decoded).toEqual({
            ...claims,
            iat: expect.any(Number),
            exp: expect.any(Number)
        })
    })

    test("Signing token with secret key and verifying token with incorrect key throws error", () => {
        const claims = {username: "test_user"}
        const token = tokens.generateToken(claims)
        console.log("Entered this test")

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