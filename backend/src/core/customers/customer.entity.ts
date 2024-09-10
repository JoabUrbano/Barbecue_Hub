import {
  IsEmail,
  IsNumberString,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CustomerData {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsNumberString()
  telephone: string;
}

export class InputCustomarData extends CustomerData {
  @IsString()
  @MinLength(3)
  password: string;
}

export class CustomerEntity extends CustomerData {
  @IsUUID()
  id: string;
}
