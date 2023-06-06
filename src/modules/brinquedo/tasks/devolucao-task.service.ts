import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DevolucaoTaskService {
    private readonly Logger: Logger = new Logger()
    constructor(private readonly prismaService: PrismaService) {}

    @Cron(CronExpression.EVERY_5_SECONDS)
    async DevolucaoDeleted(){
     
       const check  = await this.prismaService.emprestimo.deleteMany({
        where:{
            Data_Retorno:{
                lte: new Date()
            }
        }
       })
    }


}