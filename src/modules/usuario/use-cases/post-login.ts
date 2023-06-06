import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { loginDtoPost } from "../dtos/login.user.dto.service";
import { equals } from "class-validator";


@Injectable()
export default class AuthEmail{
  constructor(private prismaService: PrismaService){}
  async FindByEmail(email: string){

    const acharEmail = await this.prismaService.cadastroUsuario.findFirst({
      where:{
        Email: {equals: email}
      }
    })

    return acharEmail
  }
    
}
