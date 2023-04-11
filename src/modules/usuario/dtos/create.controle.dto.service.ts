import { IsArray, IsNotEmpty } from "class-validator";

export class CreateControleDto{
    @IsArray()
    @IsNotEmpty()
    descricao: string
}