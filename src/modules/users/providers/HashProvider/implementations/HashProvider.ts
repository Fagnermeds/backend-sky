import { hash, compare } from 'bcrypt';

import IHashProvider from '../interfaces/IHashProvider';

class HashProvider implements IHashProvider {
  public generateHashPassword = async (password: string): Promise<string> => {
    const saltRounds = 10;

    const hashPassword = await hash(password, saltRounds);

    return hashPassword;
  };

  public comparePasswordWithHash = async (
    password: string,
    hashPassword: string,
  ): Promise<boolean> => {
    const isEqualPasswords = await compare(password, hashPassword);

    return isEqualPasswords;
  };
}

export default HashProvider;
