import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ReservaTask {
    private readonly Logger: Logger = new Logger()
    constructor(private readonly prismaService: PrismaService) {}

    @Cron(CronExpression.EVERY_10_SECONDS)
    async TempoLimite(){
        const a = await this.prismaService.reserva.findFirst({
            where:{
                TempoLimite:{
                    lte: new Date()
                }
            },
            select:{
                id_brinquedo: true ,
                id_reserva: true
            }
        })
      
       
       const tempo = await this.prismaService.reserva.deleteMany({
            where:{
                TempoLimite:{
                    lte:new Date()
                }
            },
        })
        
        if(tempo.count > 0){
            
        }
    }
}