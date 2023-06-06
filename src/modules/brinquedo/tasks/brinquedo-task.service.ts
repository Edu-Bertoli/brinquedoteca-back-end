import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BrinquedoTaskService {
  private readonly logger: Logger = new Logger();

  constructor(private readonly prismaService: PrismaService) {}

  @Cron(CronExpression.EVERY_30_MINUTES)
  async verificarDataDevolucaoBrinquedos() {
    const dataAtual = new Date();

    const status = await this.prismaService.status.findUnique({
      where: {
        status: 'Atrasado',
      },
    });

    const brinquedos = await this.prismaService.emprestimo.findMany({
      select: { id_brinquedo: true, id_Emprestimo: true},
      where: {
        Data_devolucao: {
          lte: dataAtual,
        },
        NOT: {
          Reserva_Status: {
            status: 'Atrasado',
          },
        },
      },
    });

    const brinquedosId = brinquedos.map((brinquedo) => brinquedo.id_brinquedo);
    const emprestimoid = brinquedos.map((emprestimo) => emprestimo.id_Emprestimo)

    const response = await this.prismaService.emprestimo.updateMany({
      data: {
        id_status: status.id_status,
      },
      where: {
        id_Emprestimo: {
          in: emprestimoid
        }
      },
    });

    const responseEstoque =
      await this.prismaService.estoqueBrinquedo.updateMany({
        data: {
          id_status: status.id_status,
        },
        where: {
          id_Emprestimo: {
            in: emprestimoid,
          },
        },
      });

    if (responseEstoque.count > 0) {
      this.logger.log('Situação de estoque atualizadas!');
    } else {
      this.logger.log('Nenhum estoque atrasado!');
    }

    if (response.count > 0) {
      this.logger.log('Situação de emprestimos atualizadas!');
    } else {
      this.logger.log('Nenhum emprestimo atrasado!');
    }
  }
}
