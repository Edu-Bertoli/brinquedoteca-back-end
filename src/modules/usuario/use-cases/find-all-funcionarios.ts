import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { FuncionariosDto } from "../dtos/create.funcionario.dto.service";


@Injectable()

export default class FindAllFuncionariosUserCase {
  constructor(private prismaService: PrismaService) {}

   async FindAllFuncionarios(filters: FuncionariosDto){
    const funcionarios = await this.prismaService.cadastroUsuario.findMany({
        take: filters.itemsPerPage,
        skip: (filters.currentPage - 1) * filters.itemsPerPage,
        select:{
          id_usuario: true,
          Nome: true,
          Email: true,
          Nivel: true
        }
    });
    return funcionarios;
   }
}