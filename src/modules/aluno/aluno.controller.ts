import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { AlunoService } from "./aluno.service";
import { CreateAlunoDto } from "./dto/create-aluno-dto.service";
import { CreateRaSearch } from "./dto/create-RA-dto.service";
import { IsPublic } from "src/auth/decorators/is-public-decorator";



@Controller()
export default class AlunoController {
  constructor(private alunoService: AlunoService) {}

  @Post('/aluno')
  @IsPublic()
  async PostAluno(@Body() filters: CreateAlunoDto, @Res() response){
    const aluno = await this.alunoService.CreateAluno(filters)
    if(!aluno){
        return response.status(401).json('Aluno não foi criado')
    }
    return response.status(201).json(aluno)
  }

  @Get('/aluno/ra')
  @IsPublic()
  async findAluno(@Body() filters: CreateRaSearch, @Res() response){
    const aluno = await this.alunoService.FindAlunoByRA(filters)
    return response.status(200).json(aluno)
  }
}