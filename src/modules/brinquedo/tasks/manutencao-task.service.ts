import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ManutencaoTaskService {
    private readonly Logger: Logger = new Logger()
    constructor(private readonly prismaService: PrismaService) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async DevolucaoDeleted(){
     
       const check  = await this.prismaService.manutencao.deleteMany({
        where:{
            Data_Saida:{
                lte: new Date()
            }
        }
       })
    }


}