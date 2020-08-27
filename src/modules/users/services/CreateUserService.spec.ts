import mongoose from 'mongoose';

import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/mongoose/entities/User';
import UsersRepository from '../repositories/implementations/UsersRepository';
import CreateUserService from './CreateUserService';
import HashProvider from '../providers/HashProvider/implementations/HashProvider';

let usersRepository: UsersRepository;
let createUser: CreateUserService;
let hashProvider: HashProvider;

describe('CreateUser', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDB server not initialiazed');
    }
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  beforeEach(async () => {
    await User.deleteMany({});

    usersRepository = new UsersRepository();
    hashProvider = new HashProvider();

    createUser = new CreateUserService(usersRepository, hashProvider);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to create a new user', async () => {
    const createdUser = await createUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      phones: [
        {
          ddd: '99',
          number: '999999999',
        },
      ],
    });

    expect(createdUser).toHaveProperty('_id');
  });

  it('should not be able to register a user with an existing email', async () => {
    await createUser.execute({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
      phones: [
        {
          ddd: '99',
          number: '999999999',
        },
      ],
    });

    await expect(
      createUser.execute({
        name: 'test',
        email: 'test@test.com',
        password: '123456',
        phones: [
          {
            ddd: '99',
            number: '999999999',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
