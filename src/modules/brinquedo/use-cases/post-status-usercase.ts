import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export default class PostStatusBrinquedo {
  constructor(private prismaService: PrismaService) {}

  async PostStatus(){
    const status = await this.prismaService.status.create({
        data:{
            status: "Atrasado"
        }
    })

    return status
  }
}