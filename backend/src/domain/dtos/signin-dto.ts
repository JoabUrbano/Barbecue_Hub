import { IsEmail, IsString } from 'class-validator';

export class SigninBodyDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
