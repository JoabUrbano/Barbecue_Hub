import { Module } from '@nestjs/common';

import { PrismaService } from 'src/common/prisma/prisma.service';
import { CustomersRepository } from 'src/app/repositories/customer.repository';
import { CustomersRepositoryImpl } from 'src/infra/repositories/customers.repository';
import { CustomersController } from 'src/app/modules/customers/customers.controller';
import {
  CustomersService,
  CustomersServiceImpl,
} from 'src/app/modules/customers/customers.service';

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
