import { IUserSchema } from '@modules/users/infra/mongoose/entities/User';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

interface IUsersRepository {
  findById(id: string): Promise<IUserSchema>;
  findByEmail(email: string): Promise<IUserSchema>;
  create?(userData: ICreateUserDTO): Promise<IUserSchema>;
  getPasswordUser?(id: string): Promise<string>;
}

export default IUsersRepository;
