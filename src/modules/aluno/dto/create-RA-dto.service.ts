import { IsNotEmpty, isNumber, IsNumber, IsString } from "class-validator";

export class CreateRaSearch{
    @IsNumber()
    @IsNotEmpty()
    RA: number

}