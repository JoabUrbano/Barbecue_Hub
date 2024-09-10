import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CustomerEntity } from 'src/core/customers/customer.entity';

export abstract class CustomersRepository {
  abstract findMany(): Promise<CustomerEntity[]>;
  abstract findOneByEmail(email: string): Promise<CustomerEntity>;
}

@Injectable()
export class CustomersRepositoryImpl implements CustomersRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByEmail(email: string): Promise<CustomerEntity> {
    const customer = await this.prisma.customer.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        telephone: true,
      },
    });

    return customer;
  }

  async findMany(): Promise<CustomerEntity[]> {
    const customers = await this.prisma.customer.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        telephone: true,
      },
    });

    return customers;
  }
}
