import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { updateReservados } from "../dtos/create-reservados-dto.service";

@Injectable()
export default class UpdateReservados {
  constructor(private prismaService: PrismaService) {}

  async UpdateReservadosJesus(filters: updateReservados){
    const status = await this.prismaService.estoqueBrinquedo.update({
        data:{
            Estoque_Status:{
                connect:{
                   status: filters.status
                }
            }
        },
        where:{
            id_estoque: filters.id_estoque
        },
        select:{
          id_brinquedo: true,
          Cadastro_Estoque:{
            select:{
              quantidade: true
            }
          }
        }
    })
    if(filters.status == 'Disponivel'){
      await this.prismaService.cadastroBrinquedo.update({
        data:{
          quantidade: status.Cadastro_Estoque.quantidade + 1
        },
        where:{id_brinquedo: status.id_brinquedo }
      })
    }
    return status
  }
}