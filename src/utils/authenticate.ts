import { Request } from 'express';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import * as userRepository from "../repositories/usersRepository.js"
dotenv.config();

import { _unauthorized, _unprocessableEntity } from "../middlewares/errorHandlerMiddleware.js";

export const encrypt = (password: string) => bcrypt.hashSync(password, 10)

export function compare(password: string, hashPassword: string) {
    if (!bcrypt.compareSync(password, hashPassword)) _unprocessableEntity()
}

const JWT_KEY = process.env.JWT_KEY;
export const signJwt = (userId: number) => jwt.sign(String(userId), JWT_KEY);

async function verifyJwt(token: string) {
    try {
        const userId: any = jwt.verify(token, JWT_KEY);
        return await userIdValidate(Number(userId));
    } catch (e) {
        console.log(e)
        _unauthorized();
    }
}

export async function getUserByToken(headers: Request["headers"]) {
    const { authorization } = headers;
    if (!authorization) _unauthorized()
    const token = authorization.split("Bearer").at(1).trim();
    if (token === "undefined" || null || undefined) _unauthorized()
    return verifyJwt(token);
}

async function userIdValidate(userId: number) {
    const user = await userRepository.findById(userId);
    if (!user) _unauthorized()
    delete user.password
    return user;

}