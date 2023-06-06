import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export default class PostDeletedAtBrinquedo {
  constructor(private prismaService: PrismaService) {}

}