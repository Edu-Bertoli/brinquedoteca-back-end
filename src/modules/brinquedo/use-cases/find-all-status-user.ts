import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";


@Injectable()
export default class FindAllStatus {
  constructor(private prismaService: PrismaService) {}

  async FindAllStatus(){
    return await this.prismaService.status.findMany({
        orderBy:{
          id_status: 'asc'
        }
      });
  }
  }