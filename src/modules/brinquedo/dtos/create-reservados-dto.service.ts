import { IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword } from "class-validator";
import { manutencaoRetorno } from "../especial-cases/retornoenum";
import { StatusEnum } from "../especial-cases/statusenum";


export class updateReservados {


    @IsNotEmpty()
    @IsNumber()
    id_estoque: number

    @IsNotEmpty()
    @IsEnum(StatusEnum)
    @IsString()
    status: StatusEnum
}