import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateAlugarDto } from '../dtos/create.alugar.dto.service';

@Injectable()
export default class PostReservaAluno {
  constructor(private prismaService: PrismaService) {}

  async AlugaBrinquedo(filters: CreateAlugarDto) {
    const check = await this.prismaService.estoqueBrinquedo.findFirst({
      where: {
        id_estoque: filters.id_estoque,
      },
      select: {
        Estoque_Status: true,
        Cadastro_Estoque: true,
      },
    });
    if (check.Estoque_Status.status == 'Disponivel') {
      const date = new Date();
      const date_entrega = new Date(date.setDate(date.getDate() + 7));
      const alugar = await this.prismaService.emprestimo.create({
        data: {
          Data_Retirada: new Date(),
          Data_devolucao: date_entrega,

          Reserva_Aluno: {
            connect: {
              id_aluno: filters.id_aluno,
            },
          },
          ReservaEstoque: {
            connect: {
              id_estoque: filters.id_estoque,
            },
          },
        },
      });
      if (check.Cadastro_Estoque.quantidade <= 0) {
        throw new HttpException(
          'Sem quantidades disponiveis para alugar',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const mudar = await this.prismaService.estoqueBrinquedo.update({
        where: {
          id_estoque: filters.id_estoque,
        },
        data: {
          Cadastro_Estoque: {
            update: {
              quantidade: check.Cadastro_Estoque.quantidade - 1,
            },
          },

          Estoque_Status: {
            connect: {
              status: 'Alugado',
            },
          },
        },
      });
      const retorno = await this.prismaService.estoqueBrinquedo.findFirst({
        where: {
          id_estoque: filters.id_estoque,
        },
        select: {
          Emprestimo_Estoque: {
            select: {
              Reserva_Aluno: true,
              Data_Retirada: true,
            },
          },
          Estoque_Status: true,
        },
      });
    } else {
      throw new HttpException(
        'Brinquedo não disponivel para alugar',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
