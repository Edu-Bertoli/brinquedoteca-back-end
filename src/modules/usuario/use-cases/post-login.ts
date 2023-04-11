import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { loginDtoPost } from "../dtos/login.user.dto.service";


@Injectable()
export default class AuthEmail{
  constructor(private prismaService: PrismaService){}
  async FindByEmail(email: string){

    const acharEmail = await this.prismaService.cadastroUsuario.findUnique({
      where:{
        Email: email
      }
    })

    return acharEmail
  }
    
}
