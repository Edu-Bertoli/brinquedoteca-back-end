import { IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";
import { manutencaoRetorno } from "../especial-cases/retornoenum";


export class manutencaoRetornoDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(manutencaoRetorno)
    status: manutencaoRetorno

    @IsNotEmpty()
    @IsNumber()
    id_manutencao: number
}