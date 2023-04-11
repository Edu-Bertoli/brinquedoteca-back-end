import { Body } from '@nestjs/common';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export default class FilterFindAllBrinquedosDTO {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  page: number = 1;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  itensPerPage: number = 10;
}
