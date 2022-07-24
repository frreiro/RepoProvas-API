import supertest from "supertest";
import app from "../src/app.js"
import * as factory from "./factories/auth.factory.js"
import { faker } from "@faker-js/faker"

const createUser = factory.randomCorrectCreateUser()

describe("check Sign-Up request", () => {

    beforeEach(async () => {
        await factory.deleteAllUsers()
    })

    it("given an email and password, create user", async () => {
        const response = await supertest(app).post("/sign-up").send(createUser)
        expect(response.statusCode).toEqual(201);
    })

    it("given an email and password already in use, should return conflict error", async () => {
        //setUp
        await supertest(app).post("/sign-up").send(createUser)
        //test
        const response = await supertest(app).post("/sign-up").send(createUser)
        expect(response.statusCode).toEqual(409);
    })

    it("given a incorrect type of email and a correct type of password, should return unprocessable error", async () => {
        const creadentialWrong = factory.randomIncorrectCreateCredential("email")
        const response = await supertest(app).post("/sign-up").send(creadentialWrong);
        expect(response.statusCode).toEqual(422);
    })

    it("given a correct type of email and a incorrect type of password, should return unprocessable error", async () => {
        const creadentialWrong = factory.randomIncorrectCreateCredential("password")
        const response = await supertest(app).post("/sign-up").send(creadentialWrong);
        expect(response.statusCode).toEqual(422);
    })

    it("given a correct type of email and password, but a incorrect type of confirmPassword, should return unprocessable error", async () => {
        const creadentialWrong = factory.randomIncorrectCreateCredential("confirmPassword")
        const response = await supertest(app).post("/sign-up").send(creadentialWrong);
        expect(response.statusCode).toEqual(422);
    })

    afterEach(async () => {
        await factory.deleteAllUsers()
    })

})

describe("check Sign-in request", () => {

    beforeEach(async () => {
        await factory.deleteAllUsers()
    })


    it("given an email and password already registred, should return token", async () => {
        //setUp
        await supertest(app).post("/sign-up").send(createUser)
        const { confirmPassword, ...logUser } = createUser
        const response = await supertest(app).post("/sign-in").send(logUser);
        //test
        expect(response.statusCode).toEqual(200);
    })

    it("given an email already registred, but a wrong password, should return unprocessable error", async () => {
        //setUp
        await supertest(app).post("/sign-up").send(createUser)
        const { confirmPassword, ...logUser } = createUser
        const response = await supertest(app).post("/sign-in").send({ ...logUser, password: faker.internet.password(10) });
        //test
        expect(response.statusCode).toEqual(422);
    })
    it("given an email not registred, should return not found error", async () => {
        //setUp
        await supertest(app).post("/sign-up").send(createUser)
        const { confirmPassword, ...logUser } = createUser
        const response = await supertest(app).post("/sign-in").send({ ...logUser, email: faker.internet.email() });
        //test
        expect(response.statusCode).toEqual(404);
    })

    afterEach(async () => {
        await factory.deleteAllUsers()
    })
})

