import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import FilterFindAllBrinquedosDTO from '../dtos/filter-find-all-brinquedos.dto';

@Injectable()
export default class FindAllAlunos {
  constructor(private prismaService: PrismaService) {}

 async findAllAluno(filters: FilterFindAllBrinquedosDTO){
    return await this.prismaService.cadastroAluno.findMany({
        take: filters.itemsPerPage,
        skip: (filters.currentPage - 1) * filters.itemsPerPage,
        select:{
            Nome: true,
            RA: true,
            Serie: true
        }
    })
 }
}