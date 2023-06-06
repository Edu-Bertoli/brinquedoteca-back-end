import { Module } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { CreateControleDto } from "./dtos/create.controle.dto.service";
import FindAllFuncionariosUserCase from "./use-cases/find-all-funcionarios";
import PostCadastroUser from "./use-cases/post-cadastro";
import PostControle from "./use-cases/post.controle";
import UsuarioController from "./usuario.controller";
import { UsuarioService } from "./usuario.service";
import AuthEmail from "./use-cases/post-login";
import { Cargos } from "./use-cases/find-all-cargos";
import UpdateFieldsUser from "./use-cases/update-user-fiedls";


@Module({
    providers:[UsuarioService, PrismaService, PostCadastroUser, FindAllFuncionariosUserCase, PostControle, AuthEmail, Cargos, UpdateFieldsUser
    ],
    controllers:[UsuarioController],
    exports:[UsuarioService]

})

export class UsuarioModule{}
