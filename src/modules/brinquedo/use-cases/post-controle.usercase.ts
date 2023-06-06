import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateControleDto } from "../dtos/create.controle.dto.service";



@Injectable()
export default class PostControle {
  constructor(private prismaService: PrismaService) {}

  async PostControle(){
   const a = await this.prismaService.estoqueBrinquedo.findMany({
      where:{
        Estoque_Status:{
            id_status: {
              not: 1 
            },
            AND:{
              id_status:{
                not: 5
              },
              status:{
                not: 'Alugado'
              }
            }
        }
      },
      select:{
        id_brinquedo: true,   
        id_estoque: true,
        Referencia: true,
        Cadastro_Estoque:{
          select:{
            idade_max: true,
            idade_min: true,
            Cadastro_area:{
              select:{
                descricao: true
              }
            },
            Cadastro_classificacao: {

              select:{
                Descricao: true
              }
            },
            Descricao: true
          }
        },
        Estoque_Status:{
          select:{
            status: true
          }
        }
      }
    })
    return a
  }
}