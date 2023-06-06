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
        deletedAt: true,
      },
    });
    const aluno = await this.prismaService.cadastroAluno.findFirst({
      where:{
        RA:{
          equals: filters.RA
        }
      },
      select:{
        id_aluno: true
      }
    })
    if (check.Estoque_Status.status == 'Disponivel' || check.Estoque_Status.status == 'Reservado') {
      const date = new Date();
      const date_entrega = new Date(date.setDate(date.getDate() + 7));
      const alugar = await this.prismaService.emprestimo.create({
        data: {
          Data_Retirada: new Date(),
          Data_devolucao: date_entrega,
            Reserva_Status: {
            connect: {
              id_status: 2
            },
          },
          Reserva_Brinquedo: {
            connect: {
              id_brinquedo: check.Cadastro_Estoque.id_brinquedo,
            },
          },
          Reserva_Aluno: {
            connect: {
              id_aluno: aluno.id_aluno,
          },
        },
          ReservaEstoque: {
            connect: {
              id_estoque: filters.id_estoque,
              
              
            },

          },
        },
        select:{
          id_Emprestimo: true
        }
      });
      await this.prismaService.emprestimo.update({
        data:{
          id_brinquedo: check.Cadastro_Estoque.id_brinquedo
        },
        where:{id_Emprestimo: alugar.id_Emprestimo}
      })
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
          Data_Saida: null,
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
