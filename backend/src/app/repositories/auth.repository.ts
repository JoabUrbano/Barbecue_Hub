import { CustomerEntity } from 'src/domain/entities/customer.entity';

export abstract class AuthRepository {
  abstract createCustomer(
    params: TCreateCustomerParams,
  ): Promise<CustomerEntity>;
  abstract findOneCustomerByEmail(
    params: TFindOneCustomerByEmailParams,
  ): Promise<CustomerEntity>;
}

// createCustomer
export type TCreateCustomerParams = {
  name: string;
  email: string;
  telephone: string;
  password: string;
};

// findOneCustomerByEmail
export type TFindOneCustomerByEmailParams = {
  email: string;
};
