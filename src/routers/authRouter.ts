import { createUserSchema } from './../schemas/schemas.js';
import { Router } from "express";
import { createUser, loginUser } from "../controllers/authControllers.js";
import { schemaValidate } from "../middlewares/validateSchema.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidate(createUserSchema), createUser)
authRouter.post("/sign-in", schemaValidate(createUserSchema), loginUser)

export default authRouter;
