import { Injectable } from '@nestjs/common';
import { CustomersRepository } from 'src/app/repositories/customer.repository';

// findMany
export type TFindManyResult = {
  id: string;
  name: string;
  email: string;
  telephone: string;
}[];

export abstract class CustomersService {
  abstract findMany(): Promise<TFindManyResult>;
}

@Injectable()
export class CustomersServiceImpl implements CustomersService {
  constructor(private readonly customersRepository: CustomersRepository) {}

  async findMany(): Promise<TFindManyResult> {
    const customers = await this.customersRepository.findMany();

    return customers;
  }
}
