import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";


export class FuncionariosDto{
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    page: number = 1;
  
    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    itensPerPage: number = 10;
}