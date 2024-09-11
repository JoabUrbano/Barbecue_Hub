import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptProvider } from 'src/app/providers/crypt.provider';
import { AuthRepository } from 'src/app/repositories/auth.repository';

// Signin
export type TSigninParams = {
  email: string;
  password: string;
};

export type TSigninResult = { accessToken: string; refreshToken: string };

// Signup
export type TSignupParams = {
  name: string;
  password: string;
  email: string;
  telephone: string;
};

export type TSignupResult = {
  id: string;
  name: string;
  email: string;
  telephone: string;
};

export abstract class AuthService {
  abstract signin(params: TSigninParams): Promise<TSigninResult>;

  abstract signup(params: TSignupParams): Promise<TSignupResult>;
}

@Injectable()
export class AuthServiceImpl implements AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
    private readonly cryptProvider: CryptProvider,
  ) {}

  async signin(params: TSigninParams): Promise<TSigninResult> {
    const customer = await this.authRepository.findOneCustomerByEmail({
      email: params.email,
    });

    if (!customer) {
      throw new NotFoundException('Cliente com este e-mail não encontrado');
    }

    const isMatch = await this.cryptProvider.compare(
      params.password,
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

  async signup(params: TSignupParams): Promise<TSignupResult> {
    const customer = await this.authRepository.findOneCustomerByEmail({
      email: params.email,
    });

    if (customer) {
      throw new ConflictException('Email já existente');
    }

    const hashedPassword = await this.cryptProvider.hash(params.password);

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
