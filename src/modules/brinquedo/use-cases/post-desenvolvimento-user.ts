import { Body, HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateDevelopmentoDto } from "../dtos/create.desenvolvimento.dto.service";

@Injectable()
export default class PostDesenvolvimentoBrinquedo {
  constructor(private prismaService: PrismaService) {}
  async PostDesenvolvimento(filters: CreateDevelopmentoDto) {

    const check = await this.prismaService.areaDeDesenvolvimento.findFirst({
      where:{
        descricao:{
          contains: filters.desenvolvimento
        }
      }
    })
    if(check){
      throw new HttpException('Já criado', HttpStatus.UNAUTHORIZED)
    }
    const criar = await this.prismaService.areaDeDesenvolvimento.create(
      {
        data: {
          descricao: filters.desenvolvimento
        },
      },
    );
    return criar
  }
  
}
