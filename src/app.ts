import express from "express"
import "express-async-errors"
import cors from "cors"
import dotenv from "dotenv"
import appRouters from "./routers/routers.js";
import { errorHandler } from "./middlewares/errorHandlerMiddleware.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(appRouters);
app.use(errorHandler)

export default app