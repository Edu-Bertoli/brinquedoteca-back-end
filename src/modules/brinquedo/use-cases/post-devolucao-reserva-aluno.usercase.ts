import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateDevolucaoDto } from '../dtos/create.devolucao.dto.service';
import { date } from 'zod';

@Injectable()
export default class PostDevolucaoBrinquedo {
  constructor(private prismaService: PrismaService) {}

  async RetornoBrinquedo(filters: CreateDevolucaoDto) {
    const retorno = await this.prismaService.emprestimo.findFirst({
      where: {
        id_Emprestimo: filters.id_emprestimo,
      },
      select: {
        Reserva_Brinquedo: true,
        ReservaEstoque: {
          select: {
            id_estoque: true,
          },
        },
        id_Emprestimo: true,
        id_brinquedo: true,
      },
    });
    const estoque = await this.prismaService.estoqueBrinquedo.findFirst({
      where: {
        id_Emprestimo: retorno.id_Emprestimo,
      },
      select: {
        id_estoque: true,
        id_Emprestimo: true,
        Estoque_Manutencao:{
          select:{
            id_manutencao: true
          }
        },
        id_brinquedo: true,
        Cadastro_Estoque:{
          select:{
            quantidade: true
          }
        }
      },
    });

    const upda = await this.prismaService.emprestimo.update({
      where: {
        id_Emprestimo: retorno.id_Emprestimo,
      },
      data: {
        Data_Retorno: new Date(),
        Reserva_Status: {
          connect: {
            status: filters.status,
          },
        },
      },
      select: {
        ReservaEstoque: true,
        Reserva_Status: true,
        Reserva_Brinquedo: true,
        id_Emprestimo: true,
      },
    });
    if (upda.Reserva_Status.status == 'Manutencao') {
      const b = estoque.Estoque_Manutencao[0]
      const c = b?.id_manutencao
      const a = await this.prismaService.estoqueBrinquedo.update({
        data: {
          id_status: 7,
          
        },
        where: {
          id_estoque: estoque.id_estoque,
        },
      });
      const teste = await this.prismaService.manutencao.create({
        data: {
          Descricao: filters.Descricao,
          id_estoque: estoque.id_estoque,
        },
        select:{
           id_manutencao: true
        }
      }); 
      
      
   
    }
    if (upda.Reserva_Status.status == 'Disponivel') {
      await this.prismaService.estoqueBrinquedo.update({
        data: {
          id_status: 1,
        },
        where: {
          id_estoque: estoque.id_estoque,
        },
      });
      const aa = await this.prismaService.cadastroBrinquedo.findFirst({
        where: {
          id_brinquedo: upda.Reserva_Brinquedo.id_brinquedo,
        },
        select: {
          ReservaBrinquedo: {
            select: {
              id_reserva: true,
              Acionado: true
            },
          },
        },
      });
      const a = aa.ReservaBrinquedo[0];
      const b = a?.id_reserva;
      if(b){
      const teste = await this.prismaService.estoqueBrinquedo?.findFirst({
        where: {
          id_estoque: estoque.id_estoque,
          id_Emprestimo: {
            not: null,
          },
          Cadastro_Estoque: {
            ReservaBrinquedo: {
              some: {
                id_reserva: b,
              },
            },
          },
        },

        select: {
          id_estoque: true,
          id_Emprestimo: true,
          
          Cadastro_Estoque: {
            select: {
              ReservaBrinquedo: {
                select: {
                  id_reserva: true,
                  Acionado: true
                },
              },
            },
          },
        },
      });
      const te = aa.ReservaBrinquedo[0]
      const c = te.Acionado
      if (teste && c == false) {
        await this.prismaService.estoqueBrinquedo.update({
          data: {
            Estoque_Status: {
              connect: {
                status: 'Reservado',
              },
            },
          },
          where: {
            id_estoque: teste.id_estoque,
          },
        });
      }
      const date = new Date()
      const date_entrega = new Date(date.setDate(date.getDate() + 3));

      await this.prismaService.reserva.update({
        data:{
          Acionado: true,
          TempoLimite: date_entrega
        },
        where:{
          id_reserva: b
        }
      })
    }
    const cad = await this.prismaService.cadastroBrinquedo.updateMany({
      data: {
        quantidade: retorno.Reserva_Brinquedo.quantidade + 1,
      },
      where: {
        id_brinquedo: retorno.Reserva_Brinquedo.id_brinquedo,
      },
    });

  }
  if(upda.Reserva_Status.status == 'Analise'){
    const a = await this.prismaService.estoqueBrinquedo.update({
      data: {
        id_status: 3,
        
      },
      where: {
        id_estoque: estoque.id_estoque,
      },
    });
  }
    }

  

  // await this.prismaService.reservaBrinquedo.delete({
  //     where:{
  //         id_reserva: filters.id_reserva
  //     }
  // })
}
