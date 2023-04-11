import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateAlunoDto } from "../dto/create-aluno-dto.service";
import { CreateRaSearch } from "../dto/create-RA-dto.service";


@Injectable()
export default class FindAlunoByRA {
  constructor(private prismaService: PrismaService) {}

    async AlunoRa(filters: CreateRaSearch){
        return await this.prismaService.cadastroAluno.findFirst({
            where:{
                RA:{
                    equals: filters.RA
                }
            }
        })
    }
}
