import { Controller, Get, Res, Query, Post, UseGuards } from '@nestjs/common';
import { Body, Param } from '@nestjs/common/decorators';
import { response } from 'express';
import { CreateClassificationDto } from 'src/modules/brinquedo/dtos/create.classificacao.dto.service';
import { BrinquedoService } from './brinquedo.service';
import { CreateToyDto } from './dtos/create.brinquedo.dto.service';
import { CreateDevelopmentoDto } from './dtos/create.desenvolvimento.dto.service';
import { PesquisaDto } from './dtos/create.pesquisa.dto.service';
import ReservaDto from './dtos/create.reserva.dto.service';
import FilterFindAllBrinquedosDTO from './dtos/filter-find-all-brinquedos.dto';
import FindOneBrinquedoUserCase from './use-cases/find-one-brinquedos.user';
import { CreateAlugarDto } from './dtos/create.alugar.dto.service';
import { CreateFilterIdade } from './dtos-filter/create-dt-filter-idade.service';
import { CreateDevolucaoDto } from './dtos/create.devolucao.dto.service';
import { filter } from 'rxjs';
import { CreateFilterClassificacao } from './dtos-filter/create-dto-filter-classificacao.service';
import { CreateFilterArea } from './dtos-filter/create-dto-filter-area.service';
import { CreateControleDto } from './dtos/create.controle.dto.service';
import GetAllReservaDto from './dtos/create-returnreserva.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles-decorator';
import { Role } from 'src/auth/decorators/enum';
import { manutencaoDto } from './dtos/create-manutencao-dto.service';
import { manutencaoRetornoDto } from './dtos/create-manutencaoretorno-dto.service';
import { updateReservados } from './dtos/create-reservados-dto.service';

@Controller()
export default class BrinquedoController {
  constructor(private brinquedoService: BrinquedoService) {}

  @Get('/estoque')
  async findAllBrinquedos(
    @Res() response,
    @Query() filters: FilterFindAllBrinquedosDTO,
  ) {
    const brinquedos = await this.brinquedoService.findAllBrinquedos(filters);
    if (!brinquedos) {
      return response.status(401).json('Erro ao acessar o estoque');
    }
    return response.status(200).json(brinquedos);
  }
  @Get('/pesquisa/estoque')
  async findOneByMethods( @Res() response , @Query() filters: PesquisaDto) {
    const pesquisa = await this.brinquedoService.GetByMethods(filters);
    if (!pesquisa) {
      return response
        .status(401)
        .json('Esse produto não existe ou pesquise novamente');
    }
    return response.status(200).json(pesquisa);
  }
  @Get('/desenvolvimento')
  async FindAllDesenvolvimento(@Res() response) {
    const desenvolvimento =
      await this.brinquedoService.findAllDesenvolvimentos();
    if (!desenvolvimento) {
      return response.status(401).json('Erro ao acessar as classificacoes');
    }
    return response.status(200).json(desenvolvimento);
  }

  @Get('/classificacao')
  async FindAllClassificacao(@Res() response) {
    const classificacao = await this.brinquedoService.findAllClassificacao();
    if (!classificacao) {
      return response.status(401).json('Erro ao acessar as classificacoes');
    }
    return response.status(200).json(classificacao);
  }
  @Get('/status')
  async FindAllStatus(@Res() response) {
    const status = await this.brinquedoService.findAllStatus();
    if (!status) {
      return response.status(401).json('Erro ao acessar as classificacoes');
    }
    return response.status(200).json(status);
  }

  @Post('/criar/produto')
  async createPostBrinquedos(@Res() response, @Body() filters: CreateToyDto) {
    const criar = await this.brinquedoService.postProduto(filters);
    if (!criar) {
      return response.status(401).json('Erro ao criar o produto');
    }
    return response.status(201).json(criar);
  }
  @Post('/criar/desenvolvimento')
  async createDesenvolvimentoBrinquedos(
    @Res() response,
    @Body() filters: CreateDevelopmentoDto,
  ) {
    const desenvolvimento = await this.brinquedoService.postDesenvolvimento(
      filters,
    );
    if (!desenvolvimento) {
      return response.status(401).json('Erro ao criar o desenvolvimento');
    }
    return response.status(201).json(desenvolvimento);
  }
  @Post('/criar/classificacao')
  async createClassificacaoBrinquedo(
    @Res() response,
    @Body() filters: CreateClassificationDto,
  ) {
    const classificacao = await this.brinquedoService.postClassificacao(
      filters,
    );
    if (!classificacao) {
      return response
        .status(401)
        .json('Erro ao criar a area de desenvolvimento');
    }
    return response.status(201).json(classificacao);
  }
  @Post('/criar/status')
  async createStatus() {
    const status = await this.brinquedoService.PostStatus();
    return response.status(201).json(status);
  }

  @Get('/reserva')
  async GetAllDisponiveis(@Query() filters: GetAllReservaDto, @Res() response) {
    const disponivel = await this.brinquedoService.FindAllDisponiveis(filters);
    return response.status(200).json(disponivel);
  }
  @Get('/disponivel')
  async getAllEmprestimoDISPONIVEL(@Query() filters: FilterFindAllBrinquedosDTO, @Res() response) {
    const disponivel = await this.brinquedoService.FindEmprestimo(filters);
    return response.status(200).json(disponivel);
  }
  @Post('/fazer/emprestimo')
  async PostReserva(@Body() filters: CreateAlugarDto, @Res() response) {
    const reserva = await this.brinquedoService.PostReserva(filters);
    return response.status(201).json(reserva);
  }
  @Get('/alunos')
  async GetAllAlunos(@Query() filters: FilterFindAllBrinquedosDTO, @Res() response) {
    const disponivel = await this.brinquedoService.findAllAluno(filters);
    return response.status(200).json(disponivel);
  }
  @Get('/alugados')
  async GetAllAlugados(@Res() response,  @Query() filters: FilterFindAllBrinquedosDTO) {
    const alugados = await this.brinquedoService.FindAllAlugados(filters);
    return response.status(200).json(alugados);
  }

  @Get('/teste')
  async GetFilterByIdade(@Res() response) {
    const filter = await this.brinquedoService.PostControle();
    return response.status(200).json(filter);
  }

  @Post('/fazer/devolucao')
  async Devolucao(@Body() filters: CreateDevolucaoDto, @Res() response) {
    const devolucao = await this.brinquedoService.Devolucao(filters);
  

    return response.status(201).json(devolucao);
  }

  @Get('/filter/classificacao')
  async GetFilterByClassificacao(
    @Body() filters: CreateFilterClassificacao,
    @Res() response,
  ) {
    const filter = await this.brinquedoService.FilterClassificacao(filters);
    return response.status(200).json(filter);
  }
  @Get('/filter/area')
  async GetFilterByArea(@Body() filters: CreateFilterArea, @Res() response) {
    const filter = await this.brinquedoService.FilterDesenvolvimento(filters);
    return response.status(200).json(filter);
  }
  @Get('/controle')
  async PostControle( @Res() response) {
    const controle = await this.brinquedoService.PostControle();
    return response.status(200).json(controle)
  }

  @Get('/estoque/dentro')
  async GetOnClick(
    @Body() filters: FilterFindAllBrinquedosDTO,
    @Res() response,
  ) {
    const alugados = await this.brinquedoService.FindAllOnClick(filters);
    return response.status(200).json(alugados);
  }

  @Post('/fazer/reserva')
  async FazerReserva(@Body() filters: ReservaDto, @Res() response) {
    const reservas = await this.brinquedoService.FazerReserva(filters);
    return response.status(201).json(reservas);
  }

  @Post('/criar/manutencao')
  async CriarReserva(@Body() filters: manutencaoDto, @Res() response){
    const reservas = await this.brinquedoService.CriarReserva(filters)
    return response.status(201).json(reservas)
  }

  @Get('/manutencao')
  async PegarManutencao(@Query() filters: FilterFindAllBrinquedosDTO, @Res() response){ 
    const manutencao = await this.brinquedoService.Manutencao(filters)
    return response.status(200).json(manutencao)
  }
  @Post('/devolucao/manutencao')
  async UpdateDaManutencao(@Body() filters: manutencaoRetornoDto, @Res() response){
    const manutencao = await this.brinquedoService.updateManutencao(filters)
    return response.status(200).json(manutencao)
  }
  @Post('/pendencias')
  async reservadinhos(@Body() filters: updateReservados, @Res() response){
    const manutencao = await this.brinquedoService.updateReservados(filters)
    return response.status(200).json(manutencao)
  }


  @Get('/reservados')
  async FindAllReservado(@Query() filters: FilterFindAllBrinquedosDTO, @Res() response){
    const reservados = await this.brinquedoService.findAllReservados(filters)

    return response.status(200).json(reservados)
  }
}
