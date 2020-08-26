import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      phone: [
        {
          ddd: '83',
          number: '996183212',
        },
      ],
    });

    expect(user).toHaveProperty('_id');
    expect(user.email).toBe('test@test.com');
  });

  it('should not be able to register a user with an existing email', async () => {
    await createUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      phone: [
        {
          ddd: '83',
          number: '996183212',
        },
      ],
    });

    await expect(
      createUser.execute({
        name: 'test',
        email: 'test@test.com',
        password: '123456',
        phone: [
          {
            ddd: '83',
            number: '996183212',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
