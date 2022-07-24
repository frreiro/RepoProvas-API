import supertest from "supertest";
import app from "../../src/app.js";
import { faker } from "@faker-js/faker"
import * as authFactory from "../factories/auth.factory.js"
import { prisma } from "../../src/config/database.js";

const disciplinesRegistred = ["HTML e CSS", "JavaScript", "React", "Humildade", "Planejamento", "Autoconfiança"];
const categoriesRegistred = ["Projeto", "Prática", "Recuperação"];
const teachersRegistred = ["Diego Pinho", "Bruna Hamori"];

export async function deleteTests() {
    await prisma.tests.deleteMany()
}

export async function loginUserAndRetunToken() {
    const createUser = authFactory.randomCorrectCreateUser()
    await supertest(app).post("/sign-up").send(createUser)
    const { confirmPassword, ...logUser } = createUser
    const response = await supertest(app).post("/sign-in").send(logUser);
    return response.text;
}


export function createTestInfo(wrongProp: string | null) {
    const name = faker.name.jobTitle();
    const pdfUrl = faker.internet.protocol() + "://" + faker.system.commonFileName("pdf")
    let teacher = faker.helpers.arrayElement(teachersRegistred);
    let discipline = faker.helpers.arrayElement(disciplinesRegistred);
    let category = faker.helpers.arrayElement(categoriesRegistred);

    if (wrongProp === "teacher") teacher = faker.name.findName();
    if (wrongProp === "discipline") discipline = faker.random.word();
    if (wrongProp === "category") teacher = faker.random.word();

    return {
        name,
        pdfUrl,
        category,
        discipline,
        teacher,
    }
}
