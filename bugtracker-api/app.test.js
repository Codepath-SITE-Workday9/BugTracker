const request = require("supertest")
const app = require("./app")
const db = require("./db")

describe("Test the application (app.js)", () => {
    test("Not Found for site 404", async () => {
        const res = await request(app).get("/incorrect-endpoint")
        expect(res.statusCode).toEqual(404)
    })

    test("Health Check Route Returns Valid Response", async () => {
        const res = await request(app).get("/")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toEqual({"ping": "pong"})
    })
})

afterAll(async () => {
    await db.end()
})