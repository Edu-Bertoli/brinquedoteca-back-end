import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import BrinquedoController from './brinquedo.controller';
import { BrinquedoService } from './brinquedo.service';
import { CreateToyDto } from './dtos/create.brinquedo.dto.service';
import { CreateDevelopmentoDto } from './dtos/create.desenvolvimento.dto.service';
import { PesquisaDto } from './dtos/create.pesquisa.dto.service';
import FindAllBrinquedosUsecase from './use-cases/find-all-brinquedos.usecase';
import FindAllClassificacaoUserCase from './use-cases/find-all-classificacao.user';
import FindAllDesenvolvimentosUserCase from './use-cases/find-all-desenvolvimento-user';
import FindAllReservasDisponiveis from './use-cases/find-all-reservas.user';
import FindAllStatus from './use-cases/find-all-status-user';
import FindOneBrinquedoUserCase from './use-cases/find-one-brinquedos.user';
import PostBrinquedosUser from './use-cases/post-brinquedos-user';
import PostClassficacaoUsercase from './use-cases/post-classificacao-usercase';
import PostDesenvolvimentoBrinquedo from './use-cases/post-desenvolvimento-user';
import PostStatusBrinquedo from './use-cases/post-status-usercase';
import PostReservaAluno from './use-cases/post-emprestimo-aluno.usercase';
import FindAllAlugados from './use-cases/find-all-alugados.usercase';
import { CreateFilterIdade } from './dtos-filter/create-dt-filter-idade.service';
import GetFilterByIdade from './use-cases/find-filter-estoque-idade.usercase';
import PostDevolucaoBrinquedo from './use-cases/post-devolucao-reserva-aluno.usercase';
import GetFilterByClassificacao from './use-cases/find-filter-estoque-classificacao.usercase';
import GetFilterByArea from './use-cases/find-filter-estoque-area.usercase';
import PostControle from './use-cases/post-controle.usercase';
import FindAllOnClick from './use-cases/find-all-onclick-usercase';
import PostStatusReserva from './use-cases/post-reserva-usercase';
import PostManutencao from './use-cases/post-manutencao-usercase';
import FindAllManutencaoUsecase from './use-cases/find-all-manutencao.user';
import FindAllAlunos from './use-cases/find-all-alunos.user';
import FindAllDisponivelEmprestimo from './use-cases/find-all-disponivel.user';
import PostVoltadaManutencao from './use-cases/post-retornoDaManutencao.user';
import { ReservaTask } from './tasks/reserva-task.service';
import FindAllReservados from './use-cases/find-all-reservados.user';
import { updateReservados } from './dtos/create-reservados-dto.service';
import UpdateReservados from './use-cases/update-reserva.usercase';
import { ManutencaoTaskService } from './tasks/manutencao-task.service';

@Module({
  providers: [
    BrinquedoService,
    PrismaService,
    FindAllBrinquedosUsecase,
    CreateToyDto,
    PostBrinquedosUser,
    CreateToyDto,
    PostDesenvolvimentoBrinquedo,
    CreateDevelopmentoDto,
    FindOneBrinquedoUserCase,
    PesquisaDto,
    PostClassficacaoUsercase,
    FindAllDesenvolvimentosUserCase,
    FindAllClassificacaoUserCase,
    FindAllStatus,
    PostStatusBrinquedo,
    FindAllReservasDisponiveis,
    PostReservaAluno,
    FindAllAlugados,
    GetFilterByIdade,
    PostDevolucaoBrinquedo,
    GetFilterByClassificacao,
    GetFilterByArea,
    PostControle,
    FindAllOnClick,
    PostStatusReserva,
    PostManutencao,
    FindAllManutencaoUsecase,
    FindAllAlunos,
    FindAllDisponivelEmprestimo,
    PostVoltadaManutencao,
    ReservaTask,
    FindAllReservados,
    UpdateReservados,
    ManutencaoTaskService
  ],
  controllers: [BrinquedoController],
})
export class BrinquedoModule {}
