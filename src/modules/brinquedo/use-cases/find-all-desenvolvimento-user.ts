import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export default class FindAllDesenvolvimentosUserCase{
  constructor(private prismaService: PrismaService) {}

  async GetAllDesenvolvimento( ){
    const teste = await this.prismaService.areaDeDesenvolvimento.findMany({
      select:{
        descricao: true,
        id_area: true
      }
    })
    return teste
  }
}

