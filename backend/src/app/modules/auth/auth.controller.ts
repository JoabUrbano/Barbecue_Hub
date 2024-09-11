import { Body, Controller, Post } from '@nestjs/common';
import { SigninBodyDTO } from 'src/domain/dtos/signin-dto';
import { SignUpBodyDTO } from 'src/domain/dtos/signup-dto';
import { AuthService } from 'src/app/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpBodyDTO) {
    return await this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: SigninBodyDTO) {
    return await this.authService.signin(body);
  }
}
