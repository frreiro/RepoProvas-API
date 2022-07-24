import { prisma } from "../../src/config/database.js";
import { faker } from "@faker-js/faker"

export function randomCorrectCreateUser() {
    const password = faker.internet.password(10);
    return {
        email: faker.internet.email(),
        password: password,
        confirmPassword: password
    }
}

export function randomIncorrectCreateCredential(credential: "email" | "password" | "confirmPassword") {
    let email = faker.internet.email;
    let password = faker.internet.password(10);
    let confirmPassword = password;
    if (credential === "email") email = faker.internet.userName;
    if (credential === "password") password = faker.internet.password(4);
    if (credential === "confirmPassword") confirmPassword = faker.internet.password(4);
    return {
        email,
        password,
        confirmPassword
    }
}



export async function deleteAllUsers() {
    await prisma.users.deleteMany()
}

