import { Injectable } from "@nestjs/common";
import { take } from "rxjs";
import { PrismaService } from "src/database/prisma.service";
import ReservaDto from "../dtos/create.reserva.dto.service";
import GetAllReservaDto from "../dtos/create-returnreserva.service";

@Injectable()
export default class FindAllReservasDisponiveis {
  constructor(private prismaService: PrismaService) {}


  async ReturnAllDisponiveis(filters: GetAllReservaDto){
    const reserva = await this.prismaService.reserva.findMany({
      take: filters.itensPerPage,
      skip: (filters.page - 1) * filters.itensPerPage
    })

    return reserva
  }
}
