import { Request, Response, NextFunction } from "express"

export async function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    if (error.type === "Unprocessable Entity") return res.sendStatus(422);
    if (error.type === "Conflict") return res.sendStatus(409);
    return res.sendStatus(500);


}

export async function _conflict() {
    throw { type: "conflict" }
}

export async function _unprocessableEntity() {
    throw { type: "Unprocessable Entity" }
}

export async function _notfound() {
    throw { type: "Not Found" }
}