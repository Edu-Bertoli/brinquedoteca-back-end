import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateFilterIdade } from "../dtos-filter/create-dt-filter-idade.service";

@Injectable()
export default class GetFilterByIdade{
  constructor(private prismaService: PrismaService) {}

  async FiltroIdade(filters: CreateFilterIdade){
        const filtro = await this.prismaService.estoqueBrinquedo.findMany({
            where:{
                OR:[{
                    Cadastro_Estoque:{
                        idade_min:{
                            gte:filters.idademin
                        }
                        ,
                        idade_max:{
                            lte: filters.idademax
                        }
                    }
                }]
            },
            orderBy:{
                id_estoque: 'asc'
            }
            
        })

        return filtro
  }
}