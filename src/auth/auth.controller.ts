import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards , Request} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { loginDtoPost } from "src/modules/usuario/dtos/login.user.dto.service";
import { SenhaLogin } from "src/modules/usuario/dtos/create.senha.dto.service";
import { AuthRequest } from "./models/AuthRequest";
import { IsPublic } from "./decorators/is-public-decorator";



@Controller()
export class AuthController{
    constructor(private readonly authservice: AuthService){}
   
    @IsPublic()
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    async Login(@Request() req: AuthRequest){
        console.log(req.user)

        return this.authservice.login(req.user)
        // return this.authservice.validateUser(email)
    }
}