import { IsNotEmpty, IsString } from "class-validator";

export class CreateControleDto{
    @IsNotEmpty()
    @IsString()
    controle: string
}