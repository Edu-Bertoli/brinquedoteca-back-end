import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateDevelopmentoDto{
    @IsNotEmpty()
    @IsString()

    desenvolvimento: string
}