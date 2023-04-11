import { Request } from "express";
import { User } from "src/modules/usuario/entities/user.entity";


export interface AuthRequest extends Request {
    user: User
}
