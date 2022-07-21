import { Users } from "@prisma/client";
import { _notfound, _unprocessableEntity } from "../middlewares/errorHandlerMiddleware.js";
import { encrypt, compare, signJwt } from "../utils/authenticate.js"
import * as userRepository from "../repositories/usersRepository.js"

export type CreateUser = Omit<Users, "id">;

export async function createUser(user: CreateUser) {
    if (!user.email || !user.password) _unprocessableEntity()
    await userRepository.insert({ ...user, password: encrypt(user.password) });
}

export async function getUser(user: CreateUser): Promise<string> {
    if (!user.email || !user.password) _unprocessableEntity()
    const userData = await userRepository.findByEmail(user.email);
    if (!userData) _notfound
    compare(user.password, userData.password);
    return signJwt(userData.id);
}