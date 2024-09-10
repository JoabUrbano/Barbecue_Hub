import { Injectable } from '@nestjs/common';
import { CustomerEntity } from './customer.entity';
import { CustomersRepository } from './customers.repository';

export abstract class CustomersService {
  abstract findMany(): Promise<CustomerEntity[]>;
  abstract findOneByEmail(email: string): Promise<CustomerEntity>;
}

@Injectable()
export class CustomersServiceImpl implements CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async findMany(): Promise<CustomerEntity[]> {
    const customers = await this.customersRepository.findMany();

    return customers;
  }

  async findOneByEmail(email: string): Promise<CustomerEntity> {
    const customer = await this.customersRepository.findOneByEmail(email);

    return customer;
  }
}
