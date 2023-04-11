import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateClassificationDto } from "../dtos/create.classificacao.dto.service";

@Injectable()
export default class PostClassficacaoUsercase {
  constructor(private prismaService: PrismaService) {}


async PostClassificacao(filters: CreateClassificationDto) {

 const classificacaoCriada = await this.prismaService.classificacao.findFirst({
  where:{
    Descricao:{
      contains: filters.classificacao
    }
  }
 })
 if(classificacaoCriada){
  return new HttpException('Classificação já criada', HttpStatus.UNAUTHORIZED )
 }
 const classificacao =  await this.prismaService.classificacao.create({
    data: {
      Descricao: filters.classificacao,
    },
  });


  return classificacao
}
  
}
