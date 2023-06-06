import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { PesquisaDto } from "../dtos/create.pesquisa.dto.service";
@Injectable()
export default class FindOneBrinquedoUserCase {
  constructor(private prismaService: PrismaService) {}

  async GetByMethods(filters:  PesquisaDto,){
   const method = await this.prismaService.estoqueBrinquedo.findMany({
        take: filters.itensByPage,
        skip: (filters.page - 1) * filters.itensByPage,
        where: {
            OR:[{
                Referencia: {
                    equals: filters.referencia,
                  },
               
                Cadastro_Estoque:{
                 Descricao:{
                    contains: filters.nome

                 },
                },
                id_estoque: filters.id_estoque
            }]
        },
        select: {
          id_brinquedo: true,
          Data_Entrada: true,
          Data_Saida: true,
          Referencia: true,
          FormaDeEntrada: true,
          Cadastro_Estoque: {
            select: {
              Descricao: true,
              idade_min: true,
              idade_max: true,
              quantidade: true,
              
              Cadastro_area: {
                select: {
                  descricao: true,
                },
              },
              Cadastro_classificacao: {
                select: {
                  Descricao: true,
                },
              },
            },
          },
          Estoque_Status: {
            select: {
              status: true,
            },
          },
        },
      });
      return method
  }
}