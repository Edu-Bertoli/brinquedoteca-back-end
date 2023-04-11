import { Role } from "../decorators/enum";

export interface UserPayload{
    sub: number,
    email: string,
    Nivel: Role[],
    nome: string,
    iat?: number,
    exp?: number
}