import Joi from "joi";
import { User } from "../services/userServices.js";

interface createUser {
    email: string;
    password: string;
    confirmPassword: string;
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