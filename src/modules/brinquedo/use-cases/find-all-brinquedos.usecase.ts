import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import FilterFindAllBrinquedosDTO from '../dtos/filter-find-all-brinquedos.dto';

@Injectable()
export default class FindAllBrinquedosUsecase {
  constructor(private prismaService: PrismaService) {}

  async execute(filters: FilterFindAllBrinquedosDTO) {
    const teste = await this.prismaService.cadastroBrinquedo.findMany({
      where:{
        OR:{ 
          
           Brinquedo_Estoque:{

          every:{
            deletedAt: false
          }
        },
        Descricao: {
          contains: filters.descricao
        }
        }
      
      },
      take: filters.itemsPerPage,
      skip: (filters.currentPage  - 1) * filters.itemsPerPage,
      select: {
        id_brinquedo: true,
        Descricao: true,
        quantidade: true,
        idade_max: true,
        idade_min: true,
        
        Brinquedo_Estoque:{
          select:{
            Referencia: true,
            id_estoque: true,
            Data_Entrada: true,
            FormaDeEntrada: true,
            Estoque_Status:{
              select:{
                status: true
              }
            }
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
      orderBy:{
      }
    });
    return teste
  }
}
