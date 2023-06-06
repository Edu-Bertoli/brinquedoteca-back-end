import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import ReservaDto from "../dtos/create.reserva.dto.service";

@Injectable()
export default class PostStatusReserva {
  constructor(private prismaService: PrismaService) {}

  async FazerReserva(filters: ReservaDto){
    const estoque = await this.prismaService.cadastroBrinquedo.findFirst({
        where: {
            id_brinquedo: filters.id_brinquedo
        },
       select:{
        id_brinquedo: true
       }
    })
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
    const reserva = await this.prismaService.reserva.create({
        data:{
            Acionado: false,
            Reserva_Aluno:{
                connect:{
                    id_aluno: aluno.id_aluno
                }
            },
            Reserva_Brinquedo:{
                connect:{
                    id_brinquedo: estoque.id_brinquedo
                }
            }
        }
    })    
    
    
    return reserva

  }
}