import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import FilterFindAllBrinquedosDTO from "../dtos/filter-find-all-brinquedos.dto";

@Injectable()
export default class FindAllOnClick {
  constructor(private prismaService: PrismaService) {}

  async OnClick(filters: FilterFindAllBrinquedosDTO){ 
    return await this.prismaService.cadastroBrinquedo.findMany({
    take: filters.itemsPerPage,
    skip: (filters.currentPage - 1) * filters.itemsPerPage,
    select: {
      id_brinquedo: true,
      Brinquedo_Estoque:{
        select:{
          id_estoque: true,
          Data_Entrada: true,
          Data_Saida: true,
          FormaDeEntrada: true,
          Estoque_Status:{
            select:{
              status: true
            }
          }
        },
        orderBy:{
          id_estoque: 'asc'
        }
      },
      // Brinquedo_Estoque: {
      //   select: {
      //     id_estoque: true,
      //     Data_Entrada: true,
      //     Data_Saida: true,
      //     Referencia: true,
      //     FormaDeEntrada: true,
      //     Estoque_Status: {
      //       select: {
      //         status: true,
      //       },
      //     },
      //   },
      // },
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
  });}
 
}