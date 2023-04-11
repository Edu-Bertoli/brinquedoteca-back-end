import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateDevolucaoDto } from "../dtos/create.devolucao.dto.service";

@Injectable()
export default class PostDevolucaoBrinquedo {
  constructor(private prismaService: PrismaService) {}
  

  async RetornoBrinquedo(filters: CreateDevolucaoDto){
    
    const retorno = await this.prismaService.emprestimo.findFirst({
      where:{
           id_Emprestimo: filters.id_emprestimo        
      },
      select:{
       
        Reserva_Brinquedo: true,
        ReservaEstoque: true
      }
    })
    const upda = await this.prismaService.emprestimo.update({
      where:{
        id_Emprestimo: filters.id_emprestimo
      },
      data:{
        Data_devolucao: new Date()
      }
    })

    const teste = await this.prismaService.estoqueBrinquedo.findFirst({
      where:{
          id_Emprestimo: filters.id_emprestimo
      },
      select:{
        id_estoque: true,
        Estoque_Status: true
      },

    })

    const Estoque = await this.prismaService.estoqueBrinquedo.update({
      where:{
        id_estoque: teste.id_estoque
      },
      data:{
          Estoque_Status:{
            connect:{
              status: filters.status
            }
          }
      },
      select:{
        Estoque_Status: true
      }
    })


    if(Estoque.Estoque_Status.status == "Manutencao"){
      await this.prismaService.manutencao.create({
        data:{
          Data_Entrada: new Date(),
          Descricao: filters.Descricao
        }
      })
    }

      
    const reserva = await this.prismaService.reserva.findFirst({
      where:{
        Reserva_Brinquedo:{
          Brinquedo_Estoque:{
            every:{
              id_estoque: teste.id_estoque
            }
          }
        }
      },
      select:{
       
      }
      
    })
    const dataagora = new Date()
    const semana = new Date(dataagora.setDate(dataagora.getDate() + 7))
    if(reserva){
      await this.prismaService.emprestimo.create({
        data:{
          Data_Retirada:dataagora,
          Data_devolucao: semana 
        }
      })
      const a = await this.prismaService.estoqueBrinquedo.update({
        where:{
          id_estoque: teste.id_estoque
        },
        data:{
            Estoque_Status:{
              connect:{
                status: "Reservado"
              }
            }
        }
      })
    }

   

    
   
    // await this.prismaService.reservaBrinquedo.delete({
    //     where:{
    //         id_reserva: filters.id_reserva
    //     }
    // })
  }
}