import { prismaClient } from "../config/database.js";
import { CreateUser } from "../services/userServices.js";

export async function insert(user: CreateUser) {
    await prismaClient.users.create({
        data: user
    })
}


export async function findByEmail(email: string) {
    return await prismaClient.users.findFirst({
        where: {
            email
        }
    })
}