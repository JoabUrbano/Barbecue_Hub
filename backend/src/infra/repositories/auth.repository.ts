import { PrismaService } from 'src/common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import {
  AuthRepository,
  TCreateCustomerParams,
  TFindOneCustomerByEmailParams,
} from 'src/app/repositories/auth.repository';
import { CustomerEntity } from 'src/domain/entities/customer.entity';

@Injectable()
export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async createCustomer(params: TCreateCustomerParams): Promise<CustomerEntity> {
    const customer = await this.prismaService.customer.create({
      data: params,
    });

    return customer;
  }

  async findOneCustomerByEmail(
    params: TFindOneCustomerByEmailParams,
  ): Promise<CustomerEntity> {
    const customer = await this.prismaService.customer.findUnique({
      where: {
        email: params.email,
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
