import { Injectable } from '@nestjs/common';
import { CreateClassificationDto } from 'src/modules/brinquedo/dtos/create.classificacao.dto.service';
import { CreateToyDto } from './dtos/create.brinquedo.dto.service';
import { CreateDevelopmentoDto } from './dtos/create.desenvolvimento.dto.service';
import { PesquisaDto } from './dtos/create.pesquisa.dto.service';
import ReservaDto from './dtos/create.reserva.dto.service';
import FilterFindAllBrinquedosDTO from './dtos/filter-find-all-brinquedos.dto';
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
import { CreateAlugarDto } from './dtos/create.alugar.dto.service';
import PostReservaAluno from './use-cases/post-emprestimo-aluno.usercase';
import FindAllAlugados from './use-cases/find-all-alugados.usercase';
import { CreateFilterIdade } from './dtos-filter/create-dt-filter-idade.service';
import GetFilterByIdade from './use-cases/find-filter-estoque-idade.usercase';
import { CreateDevolucaoDto } from './dtos/create.devolucao.dto.service';
import PostDevolucaoBrinquedo from './use-cases/post-devolucao-reserva-aluno.usercase';
import GetFilterByClassificacao from './use-cases/find-filter-estoque-classificacao.usercase';
import { CreateFilterClassificacao } from './dtos-filter/create-dto-filter-classificacao.service';
import { CreateFilterArea } from './dtos-filter/create-dto-filter-area.service';
import GetFilterByArea from './use-cases/find-filter-estoque-area.usercase';
import PostControle from './use-cases/post-controle.usercase';
import { CreateControleDto } from './dtos/create.controle.dto.service';
import FindAllOnClick from './use-cases/find-all-onclick-usercase';
import PostStatusReserva from './use-cases/post-reserva-usercase';
import GetAllReservaDto from './dtos/create-returnreserva.service';

@Injectable()
export class BrinquedoService {
  constructor(
    private usecase: FindAllBrinquedosUsecase,
    private usecase2: PostBrinquedosUser,
    private usecase3: PostDesenvolvimentoBrinquedo,
    private usecase4: PostClassficacaoUsercase,
    private usecase5: FindOneBrinquedoUserCase,
    private usecase6: FindAllDesenvolvimentosUserCase,
    private usecase7: FindAllClassificacaoUserCase,
    private usecase8: FindAllStatus,
    private especialcase: PostStatusBrinquedo,
    private reserva: FindAllReservasDisponiveis,
    private fazerreserva: PostReservaAluno,
    private alugados: FindAllAlugados,
    private filter: GetFilterByIdade,
    private devolucao: PostDevolucaoBrinquedo,
    private filter2: GetFilterByClassificacao,
    private filter3: GetFilterByArea,
    private controle: PostControle,
    private usecase0: FindAllOnClick,
    private fazerReserva: PostStatusReserva
  ) {}

  async findAllBrinquedos(filters: FilterFindAllBrinquedosDTO) {
    return await this.usecase.execute(filters);
  }
  async postProduto(filters: CreateToyDto) {
    return await this.usecase2.PostBrinquedo(filters);
  }
  async postDesenvolvimento(filters: CreateDevelopmentoDto) {
    return await this.usecase3.PostDesenvolvimento(filters);
  }
  async postClassificacao(filters: CreateClassificationDto) {
    return await this.usecase4.PostClassificacao(filters);
  }
  async GetByMethods(filters: PesquisaDto) {
    return await this.usecase5.GetByMethods(filters);
  }

  async findAllDesenvolvimentos() {
    return await this.usecase6.GetAllDesenvolvimento();
  }

  async findAllClassificacao() {
    return await this.usecase7.GetAllClassificacao();
  }
  async findAllStatus() {
    return await this.usecase8.FindAllStatus();
  }

  async PostStatus() {
    return await this.especialcase.PostStatus();
  }

  async FindAllDisponiveis(filters: GetAllReservaDto) {
    return await this.reserva.ReturnAllDisponiveis(filters);
  }

  async PostReserva(filters: CreateAlugarDto) {
    return await this.fazerreserva.AlugaBrinquedo(filters);
  }

  async FindAllAlugados() {
    return await this.alugados.FindAllAlugados();
  }

  async FilterIdade(filters: CreateFilterIdade) {
    return await this.filter.FiltroIdade(filters);
  }

  async Devolucao(filters: CreateDevolucaoDto) {
    return await this.devolucao.RetornoBrinquedo(filters);
  }
  async FilterClassificacao(filters: CreateFilterClassificacao) {
    return await this.filter2.findByClassificacao(filters);
  }

  async FilterDesenvolvimento(filters: CreateFilterArea) {
    return await this.filter3.GetFilterByDesenvolvimento(filters);
  }

  async PostControle(filters: CreateControleDto) {
    return await this.controle.PostControle(filters);
  }

  async FindAllOnClick(filters: FilterFindAllBrinquedosDTO){
    return await this.usecase0.OnClick(filters)
  }

  async FazerReserva(filters: ReservaDto){
    return await this.fazerReserva.FazerReserva(filters)
  }
}
