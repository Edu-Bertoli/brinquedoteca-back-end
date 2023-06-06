import { Body, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { loginDtoPost } from "../dtos/login.user.dto.service";
import { equals } from "class-validator";
import { UserFieldsDto } from "../dtos/updateuser-fields.service";

@Injectable()
export default class UpdateFieldsUser {
  constructor(private prismaService: PrismaService) {}
async PostControle(@Body() filters: UserFieldsDto) {
        await this.prismaService.cadastroUsuario.updateMany({
            where:{
                id_usuario: filters.id
            },
            data:{  
                Nivel: filters?.cargo,
                Email: filters?.email
            }
        })
}
}