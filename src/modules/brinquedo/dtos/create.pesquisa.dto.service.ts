import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PesquisaDto {
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  id_estoque: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  nome: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  referencia: string;

  
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  page: number = 1
  
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  itensByPage: number = 10
}
