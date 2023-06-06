import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class FuncionariosDto{
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
}