import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export default class PostBrinquedosUser {
  constructor(private prismaService: PrismaService) {}

    async PostControle(){
        const controle = await this.prismaService.cadastroUsuario.findMany({

        })

        controle.map(element => {
          var cargo =  element.Nivel
            if(cargo == 'Diretor'){
                
            }
        });
    }

}
