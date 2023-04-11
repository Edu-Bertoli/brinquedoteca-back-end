import { Controller, Post, Res, Body, Get } from "@nestjs/common";
import { response } from "express";
import { CreateControleDto } from "./dtos/create.controle.dto.service";
import { FuncionariosDto } from "./dtos/create.funcionario.dto.service";
import { CreateUserDto } from "./dtos/create.user.dto.service";
import { loginDtoPost } from "./dtos/login.user.dto.service";
import PostControle from "./use-cases/post.controle";
import { UsuarioService } from "./usuario.service";
import { Role } from "src/auth/decorators/enum";
import { Roles } from "src/auth/decorators/roles-decorator";
import { IsPublic } from "src/auth/decorators/is-public-decorator";



@Controller()
export default class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  
  @Post('/cadastro')
  @IsPublic()
  async PostCadastro(@Body() filters: CreateUserDto, @Res() response) {
    const cadastro =  await this.usuarioService.PostCadastro(filters)
    if(!cadastro){
      return response.status(401).json('Erro ao realizar o cadastro')
    }

    return response.status(200).json([cadastro.Nome, cadastro.Nivel, cadastro.Email])
  }
  @Get('/funcionarios')
  @IsPublic()
  async GetAllFuncionarios(@Body() filters: FuncionariosDto, @Res() response){
    const funcionario = await this.usuarioService.FindAllFuncionarios(filters)
    if(!funcionario){
      return response.status(401).json('Erro ao achar funcionario')
    }
    return response.status(200).json(funcionario)
  }

  @Post('Controle')
  @IsPublic()
  async PostControle(@Body() filters: CreateControleDto, @Res() response){
    const controle = await this.usuarioService.PostControle(filters)
    if(!controle){
      return response.status(401).json('Erro ao criar controle')
    }
    return response.status(200).json(controle)
  }
}