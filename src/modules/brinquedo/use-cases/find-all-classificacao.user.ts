import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export default class FindAllClassificacaoUserCase{
  constructor(private prismaService: PrismaService) {}

  async GetAllClassificacao(){
    return await this.prismaService.classificacao.findMany({
      select:{
        Descricao: true
      }
    })
}
}