import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";


@Injectable()

export class Cargos{
  constructor(private prismaService: PrismaService) {}
    
    async cargo(){
        return await this.prismaService.cadastroUsuario.findMany({
            select:{
                Nivel: true
            }
        })
    }
}