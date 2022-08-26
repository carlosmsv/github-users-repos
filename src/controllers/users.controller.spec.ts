import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { Request } from 'express';
import { UserService } from '../services/user.service';

describe('User Controller', () => {
  let controller: UsersController;

  const requestMock = {
    query: {},
  } as unknown as Request

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UserService]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to get users list, 9 at a time', () => {
    return controller.list(requestMock)
    .then((list) => {
      expect(list).toHaveLength;
      expect(list.length).toBe(9);
    })
  })
});
