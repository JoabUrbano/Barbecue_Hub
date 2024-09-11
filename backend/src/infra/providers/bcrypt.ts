import { Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { CryptProvider } from 'src/app/providers/crypt.provider';

@Injectable()
export class BcryptProvider implements CryptProvider {
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
