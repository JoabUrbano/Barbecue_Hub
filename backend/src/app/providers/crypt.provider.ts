export abstract class CryptProvider {
  abstract compare(password: string, hash: string): Promise<boolean>;
  abstract hash(password: string): Promise<string>;
}
