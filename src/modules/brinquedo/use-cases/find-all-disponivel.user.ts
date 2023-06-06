import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import FilterFindAllBrinquedosDTO from "../dtos/filter-find-all-brinquedos.dto";


@Injectable()
export default class FindAllDisponivelEmprestimo{
  constructor(private prismaService: PrismaService) {}

  async FindAllDisponivelEmprestimo(filters: FilterFindAllBrinquedosDTO){
    return await this.prismaService.estoqueBrinquedo.findMany({
        take: filters.itemsPerPage,
        skip: (filters.currentPage - 1) * filters.itemsPerPage,
        where:{
            Estoque_Status:{
                status: 'Disponivel'
            },
        },
        select:{
          Cadastro_Estoque: {
            select:{
              Cadastro_area:true,
              Cadastro_classificacao: true,
              Descricao: true,
              idade_max: true,
              idade_min: true
            }
          },
          id_brinquedo: true,
          id_estoque: true,
          Data_Entrada: true,
          Referencia: true,
        
        }
    })
  }
}
