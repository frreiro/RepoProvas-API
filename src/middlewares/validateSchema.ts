import { NextFunction, Request, Response } from "express"
import { ObjectSchema } from "joi"
import { _unprocessableEntity } from "./errorHandlerMiddleware.js";

export function schemaValidate(schema: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) throw { type: "Unprocessable Entity" }
        next();
    }
}