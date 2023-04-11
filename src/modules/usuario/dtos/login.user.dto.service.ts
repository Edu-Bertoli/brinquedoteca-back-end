import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDtoPost{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string


    @IsNotEmpty()
    @IsString()
    senha: string
}