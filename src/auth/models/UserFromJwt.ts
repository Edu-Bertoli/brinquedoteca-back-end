import { Role } from "../decorators/enum";

export interface UserFromJwt{
    id: number,
    email: string,
    nome: string,
    nivel: Role[]
}