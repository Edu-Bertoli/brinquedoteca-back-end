import { Controller, Get, Res, Query, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
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
import { IsPublic } from 'src/auth/decorators/is-public-decorator';

@Controller()
export default class BrinquedoController {
  constructor(private brinquedoService: BrinquedoService) {}

  @Get('/estoque')
  @IsPublic()
  async findAllBrinquedos(
    @Res() response,
    @Query() filters: FilterFindAllBrinquedosDTO,
    @Body() filter: FilterFindAllBrinquedosDTO,
  ) {
    const brinquedos = await this.brinquedoService.findAllBrinquedos(filter);
    if (!brinquedos) {
      return response.status(401).json('Erro ao acessar o estoque');
    }
    return response.status(200).json(brinquedos);
  }
  @Get('/pesquisa/estoque')
  @IsPublic()
  async findOneByMethods(@Body() filters: PesquisaDto, @Res() response,){
    const pesquisa = await this.brinquedoService.GetByMethods(filters)
    if(!pesquisa){
      return response.status(401).json('Esse produto não existe ou pesquise novamente');  
    }
    return response.status(200).json(pesquisa)
  }
  @Get('/desenvolvimento')
  @IsPublic()
  async FindAllDesenvolvimento(@Res() response){
    const desenvolvimento = await this.brinquedoService.findAllDesenvolvimentos()
    if(!desenvolvimento){
      return response.status(401).json('Erro ao acessar as classificacoes');  
    }
    return response.status(200).json(desenvolvimento)
  }
  @Get('/classificacao')
  @IsPublic()
  async FindAllClassificacao(@Res() response){
    const classificacao = await this.brinquedoService.findAllClassificacao()
    if(!classificacao){
      return response.status(401).json('Erro ao acessar as classificacoes');  
    }
    return response.status(200).json(classificacao)
  }
  @Get('/status')
  @IsPublic()
  async FindAllStatus(@Res() response){
    const status = await this.brinquedoService.findAllStatus()
    if(!status){
      return response.status(401).json('Erro ao acessar as classificacoes');  
    }
    return response.status(200).json(status)
  }

  @Post('/criar/produto')
  @IsPublic()
  async createPostBrinquedos(@Res() response, @Body() filters: CreateToyDto) {
    const criar = await this.brinquedoService.postProduto(filters);
    if (!criar) {
      return response.status(401).json('Erro ao criar o produto');
    }
    return response.status(201).json(criar);
  }
  @Post('/criar/desenvolvimento')
  @IsPublic()
  
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
  @IsPublic()
  async createClassificacaoBrinquedo(
    @Res() response,
    @Body() filters: CreateClassificationDto,
  ) {
    const classificacao = await this.brinquedoService.postClassificacao(filters);
    if (!classificacao) {
      return response.status(401).json('Erro ao criar a area de desenvolvimento');
    }
    return response.status(201).json(classificacao);
  }
  @Post('/criar/status')
  @IsPublic()
  async createStatus(){
    const status = await this.brinquedoService.PostStatus()
    return response.status(201).json(status)
    }

    @Get('/reserva')
    @IsPublic()
    async GetAllDisponiveis(@Body() filters: GetAllReservaDto, @Res() response ){
      const disponivel = await this.brinquedoService.FindAllDisponiveis(filters)
      return response.status(200).json(disponivel)
    }

    @Post('/fazer/emprestimo')
    @IsPublic()
    async PostReserva(@Body() filters: CreateAlugarDto, @Res() response){
      const reserva = await this.brinquedoService.PostReserva(filters)
      return response.status(201).json(reserva)
    }

    @Get('/alugados')
    @IsPublic()
    async GetAllAlugados(@Res() response){
      const alugados = await this.brinquedoService.FindAllAlugados()
      return response.status(200).json(alugados)
    }

    @Get('/filter/idade')
    @IsPublic()
    async GetFilterByIdade(@Body() filters: CreateFilterIdade, @Res() response){
        const filter = await this.brinquedoService.FilterIdade(filters)
        return response.status(200).json(filter)
    }

    @Post('/fazer/devolucao')
    @IsPublic()
    async Devolucao(@Body() filters: CreateDevolucaoDto, @Res() response){
      const devolucao = await this.brinquedoService.Devolucao(filters)
      return response.status(201).json(devolucao)
    }

    @Get('/filter/classificacao')
    @IsPublic()
    async GetFilterByClassificacao(@Body() filters: CreateFilterClassificacao, @Res() response){
      const filter = await this.brinquedoService.FilterClassificacao(filters)
      return response.status(200).json(filter)
    }
    @Get('/filter/area')
    @IsPublic()
    async GetFilterByArea (@Body() filters: CreateFilterArea, @Res() response){
      const filter = await this.brinquedoService.FilterDesenvolvimento(filters)
      return response.status(200).json(filter)
    }
    @Post('/controle')
    @IsPublic()
    async PostControle(@Body() filters: CreateControleDto, @Res() response){
      const controle = await this.brinquedoService.PostControle(filters)
    }

    @Get('/estoque/dentro')
    @IsPublic()
    async GetOnClick(@Body() filters: FilterFindAllBrinquedosDTO, @Res() response){
      const alugados = await this.brinquedoService.FindAllOnClick(filters)
      return response.status(200).json(alugados)
    }

    @Post('/fazer/reserva')
    @IsPublic()
    async FazerReserva(@Body() filters: ReservaDto, @Res() response){
      const reservas = await this.brinquedoService.FazerReserva(filters)
      return response.status(201).json(reservas)
    }
  
}
