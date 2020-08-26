interface IHashProvider {
  generateHashPassword(password: string): Promise<string>;
  comparePasswordWithHash(
    password: string,
    hashPassword: string,
  ): Promise<boolean>;
}

export default IHashProvider;
