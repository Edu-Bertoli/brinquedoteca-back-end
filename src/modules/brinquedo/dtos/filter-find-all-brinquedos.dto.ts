import { Body } from '@nestjs/common';
import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

export default class FilterFindAllBrinquedosDTO {
  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  currentPage: number = 1;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Type(() => Number)
  itemsPerPage: number = 10;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  descricao: string;
}
