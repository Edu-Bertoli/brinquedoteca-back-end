import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import FilterFindAllBrinquedosDTO from "../dtos/filter-find-all-brinquedos.dto";


@Injectable()
export default class FindAllAlugados{
  constructor(private prismaService: PrismaService) {}

  async FindAllAlugados(filters: FilterFindAllBrinquedosDTO){
  
    const teste = await this.prismaService.emprestimo.findMany({
        take: filters.itemsPerPage,
        skip: (filters.currentPage - 1) * 10,
        select:{
            id_Emprestimo: true,
            Data_Retirada: true,
            Data_devolucao: true,
            
            Reserva_Aluno: true,
            Reserva_Brinquedo:{
                select:{
                    id_brinquedo: true,
                    Descricao: true,
                    idade_max: true,
                    idade_min: true,
                    Cadastro_area:{
                        select:{
                              descricao: true  
                        }
                    },
                    Cadastro_classificacao:{
                        select:{
                            Descricao: true
                        }
                    },
                    Brinquedo_Estoque:{
                        select:{
                            Referencia: true,
                           
                        }
                    }
                }
            }
         
        }
    })
    return teste
}
}