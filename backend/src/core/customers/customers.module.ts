import { Module } from '@nestjs/common';
import {
  CustomersService,
  CustomersServiceImpl,
} from 'src/core/customers/customers.service';
import { CustomersController } from 'src/core/customers/customers.controller';
import {
  CustomersRepository,
  CustomersRepositoryImpl,
} from 'src/core/customers/customers.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Module({
  controllers: [CustomersController],
  providers: [
    PrismaService,
    {
      provide: CustomersRepository,
      useClass: CustomersRepositoryImpl,
    },
    {
      provide: CustomersService,
      useClass: CustomersServiceImpl,
    },
  ],
})
export class CustomersModule {}
