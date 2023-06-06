import { Injectable } from "@nestjs/common";
import { UsuarioService } from "src/modules/usuario/usuario.service";

import * as bcrypt from 'bcrypt'
import { loginDtoPost } from "src/modules/usuario/dtos/login.user.dto.service";
import { SenhaLogin } from "src/modules/usuario/dtos/create.senha.dto.service";
import { User } from "src/modules/usuario/entities/user.entity";
import { UserPayload } from "./models/PayloadRequest";
import { JwtService } from "@nestjs/jwt";
import { UserToken } from "./models/UserToken";


@Injectable()
export class AuthService{
   
    constructor(private readonly usuarioService: UsuarioService, private readonly JwtService: JwtService  ){}
    login(user: User): UserToken {
       const payload: UserPayload = {
            sub: user.id,
            Email: user.Email,
            Nivel: user.Nivel,
            Nome: user.Nome
       }

       const jwtToken = this.JwtService.sign(payload)

       return {
         access_token: jwtToken,
       }
    }
    async validateUser(email: string, password: string ) {
        const user = await this.usuarioService.FindEmail(email)
        
        if(user){
            const isPasswordValid = await bcrypt.compare(password, user.Senha)


            if(isPasswordValid){
                return{
                    ...user,
                    Senha: undefined
                }
            }
        } 
        throw new Error(
            'Email address or password provided is incorrect.',
          );

        
    }

        
}


