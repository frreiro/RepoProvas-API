import { prisma } from "../config/database.js";
import { User } from "../services/userServices.js";

export async function insert(user: User) {
    await prisma.users.create({
        data: user
    })
}


export async function findByEmail(email: string) {
    return await prisma.users.findFirst({
        where: {
            email
        }
    })
}