import { IsEnum } from "class-validator"
import { PrismaService } from "src/database/prisma.service"

export enum StatusEnum {
    Disponivel = "Disponivel",
    Manutencao = "Manutencao",
    Analise = "Analise"
}