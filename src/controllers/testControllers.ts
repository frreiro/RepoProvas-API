import { Request, Response } from "express";
import * as testServices from "../services/testServices.js"
import * as tokenServices from "../utils/authenticate.js"

import { TestInfo } from "../schemas/schemas.js";

export async function createTest(req: Request, res: Response) {
    await tokenServices.getUserByToken(req.headers)
    const test: TestInfo = req.body;
    await testServices.createTest(test);
    res.sendStatus(201);
}

export async function getTestByDisciplines(req: Request, res: Response) {
    await tokenServices.getUserByToken(req.headers)
    const tests = await testServices.getTestByDiscipline()
    res.status(200).send(tests)
}

export async function getTestByTeachers(req: Request, res: Response) {
    await tokenServices.getUserByToken(req.headers)
    const tests = await testServices.getTestByTeachers()
    res.status(200).send(tests)
}