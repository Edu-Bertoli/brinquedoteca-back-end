import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import AlunoController from "./aluno.controller";
import { AlunoService } from "./aluno.service";
import PostAluno from "./use-cases/create-aluno";
import FindAlunoByRA from "./use-cases/findRa-aluno";


@Module({
    providers:[AlunoService, PrismaService, PostAluno, FindAlunoByRA],
    controllers:[AlunoController],


})

export class AlunoModule{}
