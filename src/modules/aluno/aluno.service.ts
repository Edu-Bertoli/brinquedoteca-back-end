import { Injectable } from "@nestjs/common";
import { CreateAlunoDto } from "./dto/create-aluno-dto.service";
import PostAluno from "./use-cases/create-aluno";
import { CreateRaSearch } from "./dto/create-RA-dto.service";
import FindAlunoByRA from "./use-cases/findRa-aluno";


@Injectable()
export class AlunoService {
    constructor(private usecase: PostAluno, private usecase2: FindAlunoByRA){}

    async CreateAluno(filters: CreateAlunoDto){
        return await this.usecase.AlunoCreate(filters)
    }

    async FindAlunoByRA(filters: CreateRaSearch){
        return await this.usecase2.AlunoRa(filters)
    }
}