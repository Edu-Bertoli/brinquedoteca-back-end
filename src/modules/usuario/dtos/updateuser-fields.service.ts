import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Cargo } from "../entities/user.cargo.enum";


export class UserFieldsDto{
    @IsString()
    @IsOptional()
    email: string


    @IsString()
    @IsOptional()
    @IsEnum(Cargo)
    cargo: Cargo

    @IsNumber()
    @IsNotEmpty()
    id: number
}