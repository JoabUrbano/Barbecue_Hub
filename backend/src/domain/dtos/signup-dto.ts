import { IsEmail, IsNumberString, IsString, MinLength } from 'class-validator';

export class SignUpBodyDTO {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsNumberString()
  telephone: string;
}
