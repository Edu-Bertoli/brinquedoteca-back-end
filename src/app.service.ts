import { Injectable } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { PrismaService } from './database/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AppService {
    constructor(private readonly prismaService: PrismaService) {}

  async PostCadastro() {
    // this.prismaService
    // return this.prismaService
    const teste = await this.prismaService.cadastroUsuario
    return teste


  }

    async PostLogin(){
        const login = await this.prismaService.cadastroUsuario
        return login
    }

    async PostControle(){
      const controle = await this.prismaService.controle
      return controle
    }
    async PostBrinquedo(){
      const cadastro = await this.prismaService.cadastroBrinquedo
      return cadastro
    }
    async PostEstoque(){
      const estoque = await this.prismaService.estoqueBrinquedo
      return estoque
    }

    async GetEstoque(){
      const estoque = await this.prismaService.$queryRaw`
        SELECT * FROM Cadastro_Estoque

      
      `
      
    }
}
