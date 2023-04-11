import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export default class FindAllAlugados{
  constructor(private prismaService: PrismaService) {}

  async FindAllAlugados(){
    return await this.prismaService.emprestimo.findMany({
        select:{

            Data_Retirada: true,
            Data_devolucao: true,
            Reserva_Aluno: true,
            ReservaEstoque:{
                select:{
                    Referencia: true,
                    Cadastro_Estoque:{
                        select:{
                             Descricao: true
                        }
                    },
                    Estoque_Status:{
                        select:{
                            status: true
                        }
                    }
                }
            }
        }
    })
}
}