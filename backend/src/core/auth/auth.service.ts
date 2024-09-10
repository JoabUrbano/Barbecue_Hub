import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepository } from 'src/core/auth/auth.repository';
import {
  CustomerEntity,
  InputCustomarData,
} from 'src/core/customers/customer.entity';
import { JwtService } from '@nestjs/jwt';
import { CryptService } from 'src/helpers/bcrypt';

export abstract class AuthService {
  abstract signin(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;

  abstract signup(params: InputCustomarData): Promise<CustomerEntity>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly cryptService: CryptService,
  ) {}

  async signin(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const customer = await this.authRepository.findOneCustomerByEmail(email);

    if (!customer) {
      throw new NotFoundException('Cliente com este e-mail não encontrado');
    }

    const isMatch = await this.cryptService.compare(
      password,
      customer.password,
    );

    if (!isMatch) {
      throw new UnauthorizedException('Senha incorreta');
    }

    const { accessToken, refreshToken } = await this.getTokens({
      id: customer.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async signup(params: InputCustomarData): Promise<CustomerEntity> {
    const customer = await this.authRepository.findOneCustomerByEmail(
      params.email,
    );

    if (customer) {
      throw new ConflictException('Email já existente');
    }

    const hashedPassword = await this.cryptService.hash(params.password);

    const newCustomer = await this.authRepository.createCustomer({
      email: params.email,
      name: params.name,
      password: hashedPassword,
      telephone: params.telephone,
    });

    return newCustomer;
  }

  private async getTokens(user: { id: string }) {
    const payload = {
      sub: user.id,
    };

    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(payload, { expiresIn: '24h' }),
      await this.jwtService.signAsync(payload, { expiresIn: '7d' }),
    ]);

    return { accessToken, refreshToken };
  }
}
