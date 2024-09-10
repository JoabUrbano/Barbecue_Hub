import { Module } from '@nestjs/common';
import { AuthService, AuthServiceImpl } from 'src/core/auth/auth.service';
import { AuthController } from 'src/core/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/core/auth/constants';
import {
  AuthRepository,
  AuthRepositoryImpl,
} from 'src/core/auth/auth.repository';
import { BcryptService, CryptService } from 'src/helpers/bcrypt';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: CryptService,
      useClass: BcryptService,
    },
    {
      provide: AuthRepository,
      useClass: AuthRepositoryImpl,
    },
    {
      provide: AuthService,
      useClass: AuthServiceImpl,
    },
  ],
})
export class AuthModule {}
