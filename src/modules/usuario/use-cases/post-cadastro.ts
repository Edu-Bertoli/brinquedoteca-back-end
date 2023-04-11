import { Body, HttpException, HttpStatus, Injectable, Res } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateUserDto } from "../dtos/create.user.dto.service";
import * as bcrypt from 'bcrypt'



@Injectable()
export default class PostCadastroUser {
  constructor(private prismaService: PrismaService) {}
  async PostCadastro(
    @Body() filters: CreateUserDto,
  ) {
    const hash = await bcrypt.hash(filters.senha, 8);
    const checkEmail = await this.prismaService.cadastroUsuario.findFirst({
      where: {
        Email: {
          contains: filters.email,
        },
      },
    });
    if (checkEmail) {
      throw new HttpException('Email já cadastrado', HttpStatus.UNAUTHORIZED);
    }
    const cadastro = await this.prismaService.cadastroUsuario.create({
      data: {
        Email: filters.email,
        Nome: filters.nome,
        Senha: hash,
        Nivel: 'Professor',
      },
    });

    return {
      ...cadastro,
      Senha: undefined
    };
  }

}