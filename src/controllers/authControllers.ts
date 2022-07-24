import { Request, Response } from "express"
import * as userServices from "../services/userServices.js"

export async function createUser(req: Request, res: Response) {
    const user = req.body;
    await userServices.createUser({ email: user.email, password: user.password });
    res.sendStatus(201);
}

export async function loginUser(req: Request, res: Response) {
    const user = req.body;
    const token = await userServices.getUser(user);
    res.status(200).send(token);
}