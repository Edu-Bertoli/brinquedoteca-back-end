import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import ReservaDto from "../dtos/create.reserva.dto.service";

@Injectable()
export default class PostStatusReserva {
  constructor(private prismaService: PrismaService) {}

  async FazerReserva(filters: ReservaDto){
    const estoque = await this.prismaService.estoqueBrinquedo.findFirst({
        where: {
            id_brinquedo: filters.id_brinquedo
        },
        select:{
            Estoque_Status:{
                select:{
                    status: true
                }
            }
        }
    })
     
    if(estoque.Estoque_Status.status != "Manutencao"){ 
        const reserva = await this.prismaService.reserva.create({
        data:{
            Reserva_Aluno:{
                connect:{
                    id_aluno: filters.id_aluno
                }
            },
            Reserva_Brinquedo:{
                connect:{
                    id_brinquedo: filters.id_brinquedo
                }
            }
        }
    })
    
}
  }
}