import { IsNotEmpty, IsString } from "class-validator";

export class CreateClassificationDto{
    @IsNotEmpty()
    @IsString()
    classificacao: string
}