import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from 'class-validator';

export  class CreateFilterArea {
        
        @IsNotEmpty()
        @IsString()
        descricao:string
}