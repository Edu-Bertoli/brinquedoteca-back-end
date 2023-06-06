import { Role } from "src/auth/decorators/enum";

export class User {
    id?: number;
    Email: string;
    password: string;
    Nome: string;
    Nivel: Role[];
  }
