import { Request, Response } from "express";
import * as testServices from "../services/testServices.js"
import { TestInfo } from "../schemas/schemas.js";

export async function createTest(req: Request, res: Response) {
    const test: TestInfo = req.body;
    await testServices.createTest(test);
    res.sendStatus(201);
}