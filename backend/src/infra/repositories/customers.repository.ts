import { Injectable } from '@nestjs/common';
import { CustomersRepository } from 'src/app/repositories/customer.repository';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CustomerEntity } from 'src/domain/entities/customer.entity';

@Injectable()
export class CustomersRepositoryImpl implements CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<CustomerEntity> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        email,
      },
    });

    return customer;
  }

  async findMany(): Promise<CustomerEntity[]> {
    const customers = await this.prisma.customer.findMany({});

    return customers;
  }
}
