import { Router } from "express";
import { createTest } from "../controllers/testControllers.js";

const testRouter = Router();

testRouter.post("/test", createTest)


export default testRouter