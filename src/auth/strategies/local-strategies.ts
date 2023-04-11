import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { loginDtoPost } from 'src/modules/usuario/dtos/login.user.dto.service';
import { SenhaLogin } from 'src/modules/usuario/dtos/create.senha.dto.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, password:string) {
    return this.authService.validateUser(email, password);
  }
}