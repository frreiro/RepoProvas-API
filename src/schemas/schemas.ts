import Joi from "joi";
import { CreateUser } from "../services/userServices.js";

export const createUserSchema = Joi.object<CreateUser>({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required()
})