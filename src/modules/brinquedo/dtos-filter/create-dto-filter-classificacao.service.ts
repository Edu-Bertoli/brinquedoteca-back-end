import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from 'class-validator';

export  class CreateFilterClassificacao {
        
        @IsNotEmpty()
        @IsString()
        Descricao: string


}