import supertest from "supertest";
import app from "../src/app.js";
import * as factory from "./factories/tests.tes.factory.js"
import * as authFactory from "./factories/auth.factory.js"
import { faker } from "@faker-js/faker";


beforeEach(async () => {
    await authFactory.deleteAllUsers()
})

describe("Check Create Test request", () => {

    let token: string;
    beforeEach(async () => {
        //set up
        token = await factory.loginUserAndRetunToken()
        await factory.deleteTests()
    })

    it("given an name, link, category, discipline and teacher, should create an test", async () => {
        //test
        const testInfo = factory.createTestInfo(null);
        const response = await supertest(app).post("/test").send(testInfo)
            .set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toEqual(201);
    })

    it("given an name, link, category, discipline and teacher without token, should return unauthorized", async () => {
        //set up
        const testInfo = factory.createTestInfo(null);
        //test
        const response = await supertest(app).post("/test").send(testInfo)
        expect(response.statusCode).toEqual(401);
    })

    it("given an name, link, category, discipline and non exist teacher, should return not found", async () => {
        //set up
        const testInfo = factory.createTestInfo("teacher");
        //test
        const response = await supertest(app).post("/test").send(testInfo)
            .set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toEqual(404);
    })

    it("given an name, link, category, teacher and non exist discipline, should return not found", async () => {
        //set up
        const testInfo = factory.createTestInfo("discipline");
        //test
        const response = await supertest(app).post("/test").send(testInfo)
            .set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toEqual(404);
    })

    it("given an name, link, discipline, teacher and non exist category , should return not found", async () => {
        //set up
        const testInfo = factory.createTestInfo("category");
        //test
        const response = await supertest(app).post("/test").send(testInfo)
            .set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toEqual(404);
    })

    afterEach(async () => {
        await authFactory.deleteAllUsers()
        await factory.deleteTests()
    })

})


describe("check Get Tests requests", () => {
    beforeAll(async () => {
        // create 5 differents tests
        for (let i = 0; i < 5; i++) {
            const token = await factory.loginUserAndRetunToken()
            const testInfo = factory.createTestInfo(null);
            await supertest(app).post("/test").send(testInfo).set("Authorization", `Bearer ${token}`)
        }
    })

    let token: string;
    beforeEach(async () => {
        //set up
        token = await factory.loginUserAndRetunToken()
    })

    it("given an authorization token  to get tests by disciplines, return all tests by discipline", async () => {
        //test
        const response = await supertest(app).get("/test/disciplines").set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toEqual(200);
    })

    it("given an invalid authorization token to get tests by disciplines, return unauthorized", async () => {
        const token = faker.random.alphaNumeric(10)
        //test
        const response = await supertest(app).get("/test/disciplines").set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toEqual(401);
    })

    it("try to get tests by disciplines without a token, should return unauthorized", async () => {
        //test
        const response = await supertest(app).get("/test/disciplines")
        expect(response.statusCode).toEqual(401);
    })

    it("given an authorization token  to get tests by teachers, return all tests by teachers", async () => {
        //test
        const response = await supertest(app).get("/test/teachers").set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toEqual(200);
    })

    it("given an invalid authorization token to get tests by teachers, return unauthorized", async () => {
        const token = faker.random.alphaNumeric(10)
        //test
        const response = await supertest(app).get("/test/teachers").set("Authorization", `Bearer ${token}`)
        expect(response.statusCode).toEqual(401);
    })

    it("try to get tests by teacher without a token, should return unauthorized", async () => {
        //test
        const response = await supertest(app).get("/test/teachers")
        expect(response.statusCode).toEqual(401);
    })

    afterEach(async () => {
        await authFactory.deleteAllUsers()
    })

    afterAll(async () => {
        await factory.deleteTests()
    })
})

