import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();

import { _unprocessableEntity } from "../middlewares/errorHandlerMiddleware.js";

export const encrypt = (password: string) => bcrypt.hashSync(password, 10)

export const compare = (password: string, hashPassword: string) => {
    if (!bcrypt.compareSync(password, hashPassword)) _unprocessableEntity
}

const JWT_KEY = process.env.JWT_KEY;
export const signJwt = (userId: number) => jwt.sign("1232", JWT_KEY);
