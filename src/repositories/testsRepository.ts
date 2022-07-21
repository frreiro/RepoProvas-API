import { CreateTest } from './../services/testServices.js';
import { prisma } from "../config/database.js";

export async function create(test: CreateTest) {
    await prisma.tests.create({
        data: test
    })
}
