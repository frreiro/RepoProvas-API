import Joi from "joi";
import { User } from "../services/userServices.js";

interface createUser {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface TestInfo {
    name: string;
    pdfUrl: string;
    category: string;
    discipline: string;
    teacher: string;
}

export const createUserSchema = Joi.object<createUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    confirmPassword: Joi.ref("password")
})


export const loginUserSchema = Joi.object<User>({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})

export const testSchema = Joi.object<TestInfo>({
    name: Joi.string().required(),
    pdfUrl: Joi.string().uri().required(),
    category: Joi.string().required(),
    discipline: Joi.string().required(),
    teacher: Joi.string().required()
})