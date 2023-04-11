import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './database/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './modules/usuario/dtos/create.user.dto.service';
import { Delete, Param, Response } from '@nestjs/common/decorators';
import { CreateToyDto } from './modules/brinquedo/dtos/create.brinquedo.dto.service';
import { CreateDevelopmentoDto } from './modules/brinquedo/dtos/create.desenvolvimento.dto.service';
import { CreateClassificationDto } from './modules/brinquedo/dtos/create.classificacao.dto.service';
import { Prisma } from '@prisma/client';
import { loginDtoPost } from './modules/usuario/dtos/login.user.dto.service';
import { PesquisaDto } from './modules/brinquedo/dtos/create.pesquisa.dto.service';
import { CreateControleDto } from './modules/usuario/dtos/create.controle.dto.service';
import { Roles } from './auth/decorators/roles-decorator';
import { Role } from './auth/decorators/enum';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}
  @Delete('/status')
  @Roles(Role.Coordenador)
  async Delete(){
    const a = await this.prisma.status.deleteMany({
      where:{
        id_status:{
          gte: 2
        }
      }
    })
  }

  


}
