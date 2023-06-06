import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import FilterFindAllBrinquedosDTO from '../dtos/filter-find-all-brinquedos.dto';

@Injectable()
export default class FindAllManutencaoUsecase {
  constructor(private prismaService: PrismaService) {}


  async findManutencao(filters: FilterFindAllBrinquedosDTO){
        const manu = await this.prismaService.manutencao.findMany({
            take: filters.itemsPerPage  ,
            skip: (filters.currentPage - 1 ) * filters.itemsPerPage,
            select:{
              Data_Entrada: true,
              Data_Saida: true,
              id_manutencao: true,
              Descricao: true,
              Brinquedo_Manutencao:{
                select:{
                   Referencia: true,
                   id_estoque: true,
                   Cadastro_Estoque:{
                    select:{
                      id_brinquedo: true,
                      Descricao: true,
                      
                    }
                   }
                }
              }
            }
        })
        return manu
  }
}