import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import FilterFindAllBrinquedosDTO from '../dtos/filter-find-all-brinquedos.dto';

@Injectable()
export default class FindAllBrinquedosUsecase {
  constructor(private prismaService: PrismaService) {}

  async execute(filters: FilterFindAllBrinquedosDTO) {
    return await this.prismaService.cadastroBrinquedo.findMany({
      take: filters.itensPerPage,
      skip: (filters.page - 1) * filters.itensPerPage,
      select: {
        id_brinquedo: true,
        Descricao: true,
        quantidade: true,
        idade_min: true,
        idade_max: true,
       
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
    });
  }
}
