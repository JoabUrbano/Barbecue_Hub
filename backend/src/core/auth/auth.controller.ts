import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import { InputCustomarData } from 'src/core/customers/customer.entity';
import { SigninDto } from 'src/core/auth/dtos/signin-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: InputCustomarData) {
    return await this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SigninDto) {
    return await this.authService.signin(body.email, body.password);
  }
}
