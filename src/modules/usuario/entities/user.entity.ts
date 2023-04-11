import { Role } from "src/auth/decorators/enum";

export class User {
    id?: number;
    email: string;
    password: string;
    nome: string;
    Nivel: Role[];
  }
