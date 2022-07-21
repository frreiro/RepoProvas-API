import supertest from "supertest";
import app from "../src/app.js"

const EMAIL = "pedro@uol.com"
const PASSWORD = "123456789"
const user = { email: EMAIL, password: PASSWORD }


describe("check authorization request", () => {
    it("given an email and password, create user", async () => {
        const response = await supertest(app).post("/sign-up").send(user)
        expect(response.statusCode).toEqual(201)
    })
})