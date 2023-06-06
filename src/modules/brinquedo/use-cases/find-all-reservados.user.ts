import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import FilterFindAllBrinquedosDTO from '../dtos/filter-find-all-brinquedos.dto';

@Injectable()
export default class FindAllReservados {
  constructor(private prismaService: PrismaService) {}

  async FindAllReservados(filters: FilterFindAllBrinquedosDTO) {
    const teste = await this.prismaService.reserva.findMany({
      take: filters.itemsPerPage,
      skip: (filters.currentPage - 1) * filters.itemsPerPage,
      where: {
        Acionado: true,
      },
      select: {
        TempoLimite: true,
        id_reserva: true,
        Reserva_Brinquedo: {
          select: {
            Brinquedo_Estoque: {
              select: {
                Referencia: true,
                id_estoque: true,
                id_status: true,
                Estoque_Status: {
                  select: {
                    status: true,
                  },
                },
              },
              where: {
                id_status: 5,
              },
            },
            Descricao: true,
            idade_max: true,
            idade_min: true,
            id_brinquedo: true,
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
        Reserva_Aluno: {
          select: {
            Nome: true,
            RA: true,
            Serie: true,
          },
        },
      },
    });
    return teste;
  }
}
