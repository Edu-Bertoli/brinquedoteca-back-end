import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { number } from 'zod';

export default class GetAllReservaDto {
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  itensPerPage: number = 10;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  nome: string ;


  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  RA: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  serie: string

}
