import { Body, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateControleDto } from "../dtos/create.controle.dto.service";

@Injectable()
export default class PostControle {
  constructor(private prismaService: PrismaService) {}
async PostControle(@Body() filters: CreateControleDto) {

    const controle = await this.prismaService.controle.create({
      data: {
        Descricao: filters.descricao,
      },
    });
    return controle;
  }
}