import { IUserSchema } from '@modules/users/infra/mongoose/entities/User';

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
  findById(id: string): Promise<IUserSchema>;
  findByEmail(email: string): Promise<IUserSchema>;
  create?(userData: UserDataProps): Promise<IUserSchema>;
  getPasswordUser?(id: string): Promise<string>;
}

export default IUsersRepository;
