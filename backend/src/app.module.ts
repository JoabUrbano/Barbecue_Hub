import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './core/auth/auth.module';
import { CustomersModule } from './core/customers/customers.module';

@Module({
  imports: [AuthModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
