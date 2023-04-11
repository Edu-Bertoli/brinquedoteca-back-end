import { IsEmail, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString } from 'class-validator';

export  class CreateFilterIdade {
        
        @IsNotEmpty()
        @IsNumber()
        idademin: number


        @IsNotEmpty()
        @IsNumber()
        idademax: number
}