import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export default class GetAllReservaDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  page: number = 1;

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  itensPerPage: number = 10;

  
}
