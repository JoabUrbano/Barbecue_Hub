import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

export abstract class CryptService {
  abstract compare(password: string, hash: string): Promise<boolean>;
  abstract hash(password: string): Promise<string>;
}

@Injectable()
export class BcryptService implements CryptService {
  async compare(password: string, hash: string): Promise<boolean> {
    const isMatch = await bcryptjs.compare(password, hash);

    return isMatch;
  }

  async hash(password: string): Promise<string> {
    const saltOrRounds = 10;

    const hash = await bcryptjs.hash(password, saltOrRounds);

    return hash;
  }
}
