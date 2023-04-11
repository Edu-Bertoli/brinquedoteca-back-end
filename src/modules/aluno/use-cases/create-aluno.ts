import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateAlunoDto } from "../dto/create-aluno-dto.service";


@Injectable()
export default class PostAluno {
  constructor(private prismaService: PrismaService) {}

  async AlunoCreate(filters: CreateAlunoDto){
  const encontrarAluno = await this.prismaService.cadastroAluno.findFirst({
    where: {
      RA: {
        equals: filters.RA,
      },
    },
  });

  if (encontrarAluno) {
    throw new HttpException('Aluno já registrado', HttpStatus.UNAUTHORIZED);
  }

  const aluno = await this.prismaService.cadastroAluno.create({
    data: {
      Nome: filters.nome,
      RA: filters.RA,
      Serie: filters.serie,
    },
  });

  return aluno;
}
}
