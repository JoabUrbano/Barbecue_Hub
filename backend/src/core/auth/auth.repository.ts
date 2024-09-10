import {
  InputCustomarData,
  CustomerEntity,
} from 'src/core/customers/customer.entity';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

export abstract class AuthRepository {
  abstract createCustomer(params: InputCustomarData): Promise<CustomerEntity>;
  abstract findOneCustomerByEmail(email: string): Promise<{
    id: string;
    name: string;
    email: string;
    telephone: string;
    password: string;
  }>;
}

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCustomer(params: InputCustomarData): Promise<CustomerEntity> {
    const customer = await this.prismaService.customer.create({
      data: params,
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
      },
    });

    return customer;
  }

  async findOneCustomerByEmail(email: string): Promise<{
    id: string;
    name: string;
    email: string;
    telephone: string;
    password: string;
  }> {
    const customer = await this.prismaService.customer.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        telephone: true,
        password: true,
      },
    });

    return customer;
  }
}
