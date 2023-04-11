import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength, maxLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MaxLength(27)
  @MinLength(4)
  senha: string;

  @IsNotEmpty()
  @IsString()
  nome: string;

}