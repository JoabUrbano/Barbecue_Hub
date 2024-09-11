import { CustomerEntity } from 'src/domain/entities/customer.entity';

export abstract class CustomersRepository {
  abstract findMany(): Promise<CustomerEntity[]>;
}
