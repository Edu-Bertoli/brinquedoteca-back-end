import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateFilterClassificacao } from "../dtos-filter/create-dto-filter-classificacao.service";

@Injectable()
export default class GetFilterByClassificacao{
  constructor(private prismaService: PrismaService) {}


    async findByClassificacao(filters: CreateFilterClassificacao){
        const classByFilter = await this.prismaService.estoqueBrinquedo.findMany({
            where:{
               Cadastro_Estoque:{
                Cadastro_classificacao:{
                    Descricao:{
                        contains: filters.Descricao
                    }
                }
               }
            }
        })
        return classByFilter
    }
}