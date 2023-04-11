import { Injectable } from "@nestjs/common";
import { CreateControleDto } from "./dtos/create.controle.dto.service";
import { FuncionariosDto } from "./dtos/create.funcionario.dto.service";
import { CreateUserDto } from "./dtos/create.user.dto.service";
import { loginDtoPost } from "./dtos/login.user.dto.service";
import FindAllFuncionariosUserCase from "./use-cases/find-all-funcionarios";
import PostCadastroUser from "./use-cases/post-cadastro";
import PostControle from "./use-cases/post.controle";
import AuthEmail from "./use-cases/post-login";


@Injectable()
export class UsuarioService {
  constructor(private usecase: AuthEmail, private usecase2: PostCadastroUser, 
    private usecase3: FindAllFuncionariosUserCase, private usecase4: PostControle) {}
 

  async PostCadastro(filters: CreateUserDto){
    return await this.usecase2.PostCadastro(filters)
  }
  async FindEmail(email: string){
    return await this.usecase.FindByEmail(email)
  }
  async FindAllFuncionarios(filters: FuncionariosDto){
    return await this.usecase3.FindAllFuncionarios(filters)
  }
  async PostControle(filters: CreateControleDto){
    return await this.usecase4.PostControle(filters)
  }
}