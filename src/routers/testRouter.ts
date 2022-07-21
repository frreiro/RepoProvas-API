import { testSchema } from './../schemas/schemas.js';
import { Router } from "express";
import { createTest } from "../controllers/testControllers.js";
import { schemaValidate } from "../middlewares/validateSchema.js";

const testRouter = Router();

testRouter.post("/test", schemaValidate(testSchema), createTest)


export default testRouter