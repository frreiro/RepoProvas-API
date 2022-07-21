import { Router } from "express";
import authRouter from "./authRouter.js";
import testRouter from "./testRouter.js";


const appRouters = Router();
appRouters.use(authRouter)
appRouters.use(testRouter)

export default appRouters;