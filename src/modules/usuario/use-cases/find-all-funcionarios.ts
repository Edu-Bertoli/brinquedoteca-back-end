import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { FuncionariosDto } from "../dtos/create.funcionario.dto.service";


@Injectable()

export default class FindAllFuncionariosUserCase {
  constructor(private prismaService: PrismaService) {}

   async FindAllFuncionarios(filters: FuncionariosDto){
    const funcionarios = await this.prismaService.cadastroUsuario.findMany({
        take: filters.itensPerPage,
        skip: (filters.page - 1) * filters.itensPerPage,
        select:{
          id_usuario: true,
          Nome: true,
          Email: true,
          Nivel: true
        }
    });
    return {...funcionarios};
   }
}