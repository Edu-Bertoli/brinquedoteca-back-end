import { IsNotEmpty, IsString } from "class-validator";


export class SenhaLogin{
    @IsString()
    @IsNotEmpty()
    senha: string
}