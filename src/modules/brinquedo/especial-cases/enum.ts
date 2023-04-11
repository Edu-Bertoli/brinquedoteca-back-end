import { IsEnum } from "class-validator"
import { PrismaService } from "src/database/prisma.service"

export enum FormaDeEntrada {
    Compra = "Compra",
    Doacao = "Doacao"
}