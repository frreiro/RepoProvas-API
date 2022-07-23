import { testSchema } from './../schemas/schemas.js';
import { Router } from "express";
import { createTest, getTestByDisciplines, getTestByTeachers } from "../controllers/testControllers.js";
import { schemaValidate } from "../middlewares/validateSchema.js";

const testRouter = Router();

testRouter.post("/test", schemaValidate(testSchema), createTest);
testRouter.get("/test/disciplines", getTestByDisciplines);
testRouter.get("/test/teachers", getTestByTeachers)



export default testRouter