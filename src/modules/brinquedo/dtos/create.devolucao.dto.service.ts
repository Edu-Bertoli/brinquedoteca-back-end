import { IsEmail, IsEnum, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from '../especial-cases/statusenum';

export  class CreateDevolucaoDto {
        
       
        
        @IsNotEmpty()
        @IsNumber()
        id_emprestimo: number


    
        @IsNotEmpty()
        @IsEnum(StatusEnum)
        @IsString()
        status: StatusEnum

        @IsNotEmpty()
        @IsString()
        Descricao: string


}