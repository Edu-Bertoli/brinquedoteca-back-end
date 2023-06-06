import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateToyDto } from '../dtos/create.brinquedo.dto.service';

@Injectable()
export default class PostBrinquedosUser {
  constructor(private prismaService: PrismaService) {}

  async PostBrinquedo(filters: CreateToyDto) {
    const arrayToCreate: any = [];

    for (let i = 0; i < filters.quantidade; i++) {
      arrayToCreate.push({
        Referencia: filters.referencia,
        Data_Entrada: new Date(),
        Data_Saida: null,
        FormaDeEntrada: filters.formaDeEntrada,
        id_status: 1,
      });
    }
    
    return await this.prismaService.cadastroBrinquedo.create({
      data: {
        Descricao: filters.descricao,
        idade_min: filters.idademin,
        idade_max: filters.idademax,
        quantidade: filters.quantidade,
        Brinquedo_Estoque: {
          createMany: {
            data: arrayToCreate,
            
          },
        },
        Cadastro_area: {
          connect: {
            id_area: filters.id_area,
          },
        },
        Cadastro_classificacao: {
          connect: {
            id_classificacao: filters.id_classificacao,
          },
        },
      },
    
    });
  
  }
}
