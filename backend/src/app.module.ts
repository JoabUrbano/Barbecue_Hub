import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from 'src/app/modules/auth/auth.module';
import { CustomersModule } from 'src/app/modules/customers/customers.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, CustomersModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
