import { Request, Response, NextFunction } from "express"

export async function errorHandler(error, req: Request, res: Response, next: NextFunction) {
    console.log(error)
    if (error.type === "Unprocessable Entity") return res.sendStatus(422);
    if (error.type === "Conflict") return res.sendStatus(409);
    if (error.type === "Expectation Fail") return res.sendStatus(417);
    if (error.type === "Not Found") return res.sendStatus(404);

    return res.sendStatus(500);


}

export function _conflict() {
    throw { type: "conflict" }
}

export function _unprocessableEntity() {
    throw { type: "Unprocessable Entity" }
}

export function _notfound() {
    throw { type: "Not Found" }
}

export function _expectationFail() {
    throw { type: "Expectation Fail" }
}