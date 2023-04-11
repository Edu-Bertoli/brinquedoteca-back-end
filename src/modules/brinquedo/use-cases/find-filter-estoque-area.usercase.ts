import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateFilterArea } from "../dtos-filter/create-dto-filter-area.service";


@Injectable()
export default class GetFilterByArea{
  constructor(private prismaService: PrismaService) {}

  async GetFilterByDesenvolvimento(filters: CreateFilterArea){
    const desenvolvimento = await this.prismaService.estoqueBrinquedo.findMany({
        where:{
            Cadastro_Estoque:{
                Cadastro_area:{
                    descricao:{
                        contains: filters.descricao
                    }
                }
                
            }
        }
    })
    return desenvolvimento
  }
}