import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/app/modules/auth/constants';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CryptProvider } from 'src/app/providers/crypt.provider';
import { BcryptProvider } from 'src/infra/providers/bcrypt';
import { AuthRepository } from 'src/app/repositories/auth.repository';
import { AuthRepositoryImpl } from 'src/infra/repositories/auth.repository';
import { AuthController } from 'src/app/modules/auth/auth.controller';
import {
  AuthService,
  AuthServiceImpl,
} from 'src/app/modules/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
      
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    {
      provide: CryptProvider,
      useClass: BcryptProvider,
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
