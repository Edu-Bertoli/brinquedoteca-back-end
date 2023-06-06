import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class ReservaDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  page: number = 1;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  itensPerPage: number = 10;

  @IsNumber()
  @IsNotEmpty()
  id_brinquedo: number

  
  @IsNumber()
  @IsNotEmpty()
  RA: number


  
}
