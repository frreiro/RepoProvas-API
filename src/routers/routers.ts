import { Router } from "express";
import authRouter from "./authRouter.js";


const appRouters = Router();
appRouters.use(authRouter)

export default appRouters;