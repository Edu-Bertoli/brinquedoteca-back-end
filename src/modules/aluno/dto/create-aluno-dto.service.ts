import { IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";

export class CreateAlunoDto{
    @IsString()
    @IsNotEmpty()
    nome: string

    @IsNumber()
    @IsNotEmpty()
    RA: number

    @IsNumber()
    @IsNotEmpty()
    serie: number
}