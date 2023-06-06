import { Role } from "../decorators/enum";

export interface UserPayload{
    sub: number,
    Email: string,
    Nivel: Role[],
    Nome: string,
    iat?: number,
    exp?: number
}