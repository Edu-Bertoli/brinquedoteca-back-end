import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { manutencaoDto } from "../dtos/create-manutencao-dto.service";

@Injectable()
export default class PostManutencao{
  constructor(private prismaService: PrismaService) {}

    async postManutencao(filter: manutencaoDto){
        const a = await this.prismaService.manutencao.create({
            data:{
                Descricao: filter.descricao,
                Data_Saida: new Date(),
                Brinquedo_Manutencao:{
                    connect:{
                        id_estoque: filter.id_estoque
                    }
                },
            },
            select:{
                id_manutencao: true
            }
        })
        await this.prismaService.manutencao.update({
            data:{
                Data_Saida: null
            },
            where:
            {
                id_manutencao: a.id_manutencao
            }
        })
         const estoque = await this.prismaService.estoqueBrinquedo.update({
            data:{
                Estoque_Status:{
                connect:{
                    status:'Manutencao'
                }
            },
           
        },
         where:{
            id_estoque: filter.id_estoque,
            
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
        const cadastroBrinquedo  = await this.prismaService.cadastroBrinquedo.update({
            data:{
                quantidade: estoque.Cadastro_Estoque.quantidade - 1
            },
            where:{
                id_brinquedo: estoque.id_brinquedo
            }
        })
        return a
    }
     
    
}