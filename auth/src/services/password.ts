import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class PasswordService {
  static async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hashedPassword = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${salt}$${hashedPassword.toString('hex')}`;
  }

  static async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    const [salt, hashedPasswordFromDb] = hashedPassword.split('$');
    const hashedPasswordBuffer = (await scryptAsync(
      password,
      salt,
      64,
    )) as Buffer;
    return hashedPasswordFromDb === hashedPasswordBuffer.toString('hex');
  }
}
