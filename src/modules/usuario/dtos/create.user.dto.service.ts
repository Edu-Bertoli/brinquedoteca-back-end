import { IsEmail, IsEnum, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength, maxLength } from 'class-validator';
import { Cargo } from '../entities/user.cargo.enum';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  
  senha: string;

  @IsNotEmpty()
  @IsString()
  nome: string;


  @IsNotEmpty()
  @IsString()
  @IsEnum(Cargo)
  cargo: Cargo
}