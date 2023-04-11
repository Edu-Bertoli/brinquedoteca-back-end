import { IsEmail, IsEnum, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from 'class-validator';
import { FormaDeEntrada } from '../especial-cases/enum';

export  class CreateToyDto {
        @IsNotEmpty()
        @IsString()
        descricao: string

        @IsNotEmpty()
        @IsOptional()
        @IsEnum(FormaDeEntrada)
        formaDeEntrada: FormaDeEntrada

        @IsNotEmpty()
        @IsNumber()
        idademin: number


        @IsNotEmpty()
        @IsNumber()
        idademax: number

        @IsNotEmpty()
        @IsString()
        referencia: string

        @IsNotEmpty()
        @IsNumber()
        quantidade: number

        @IsNotEmpty()
        @IsNumber()
        id_area: number

        @IsNotEmpty()
        @IsNumber()
        id_classificacao: number

}