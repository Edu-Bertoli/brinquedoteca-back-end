import { Injectable } from "@nestjs/common";
import { take } from "rxjs";
import { PrismaService } from "src/database/prisma.service";
import ReservaDto from "../dtos/create.reserva.dto.service";
import GetAllReservaDto from "../dtos/create-returnreserva.service";

@Injectable()
export default class FindAllReservasDisponiveis {
  constructor(private prismaService: PrismaService) {}


  async ReturnAllDisponiveis(filters: GetAllReservaDto){
    return await this.prismaService.reserva.findMany({
      where:{
        OR:{
          Acionado: false,
          Reserva_Aluno:{
                Nome: {
                  contains: filters.nome
                },
                RA: {equals: filters.RA},
                Serie: {contains: filters.serie}
          }
        }
      },
      take: filters.itensPerPage,
      skip: (filters.page - 1) * filters.itensPerPage,
     
      select:{
        Reserva_Aluno:{
          select:{
            Nome: true,
            RA: true,
          Serie: true
          }
        },

        Reserva_Brinquedo:{
          select:{
            Descricao: true,
            idade_max: true,
            idade_min: true,
            id_brinquedo: true,
            ReservaBrinquedo:{
              select:{
                Reserva_Aluno:{
                  select:{
                    Nome: true,
                    RA: true,
                    Serie: true
                  }
                }
              }
            }     ,
            Cadastro_area: {
              select:{
                descricao: true
              }
            },
            Cadastro_classificacao:{
              select:{
                 Descricao: true
              }
            },
            Brinquedo_Estoque:{
              select:{
                Referencia: true,

              }
            }
          }
        }
      }
    })

  }
}
