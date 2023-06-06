import { Body, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { manutencaoRetornoDto } from "../dtos/create-manutencaoretorno-dto.service";

@Injectable()
export default class PostVoltadaManutencao {
  constructor(private prismaService: PrismaService) {}

  async  UpdateDaManutencao(@Body() filters: manutencaoRetornoDto){
        const retorno = await this.prismaService.manutencao.update({
            data:{
                Data_Saida: new Date(),
               
            },
            where:{
                id_manutencao:filters.id_manutencao
            },
            select:{
                id_estoque: true
            }
        })

       const estoque = await this.prismaService.estoqueBrinquedo.update({
            where:{
                id_estoque: retorno.id_estoque
            },
            data:{
                 Estoque_Status:{
                    connect:{
                        status: filters.status
                    }
                 }
            },select:{
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
                where:{
                    id_brinquedo: estoque.id_brinquedo
                },
                data:{
                    quantidade: estoque.Cadastro_Estoque.quantidade + 1
                }
            })
        }
  }
}