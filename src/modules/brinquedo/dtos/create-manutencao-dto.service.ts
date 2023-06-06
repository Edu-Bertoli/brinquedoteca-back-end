import { IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";


export class manutencaoDto {
    @IsNotEmpty()
    @IsString()
    descricao: string

    @IsNotEmpty()
    @IsNumber()
    id_estoque: number
}