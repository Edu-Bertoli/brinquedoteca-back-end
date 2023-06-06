import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from 'class-validator';

export  class CreateAlugarDto {
        
        @IsNotEmpty()
        @IsNumber()
        id_estoque: number


        @IsNotEmpty()
        @IsNumber()
        RA: number
}