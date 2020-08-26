import { IUserSchema } from '../../schemas/User';

export interface UserDataProps {
  name: string;
  email: string;
  password: string;
  phones: [
    {
      ddd: string;
      number: string;
    },
  ];
}

interface IUsersRepository {
  findByEmail(email: string): Promise<IUserSchema>;
  create(userData: UserDataProps): Promise<IUserSchema>;
  getPasswordUser(id: string): Promise<string>;
}

export default IUsersRepository;
