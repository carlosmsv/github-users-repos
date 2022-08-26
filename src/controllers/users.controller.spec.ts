import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { Request } from 'express';
import { UserService } from '../services/user.service';

describe('User Controller', () => {
  let controller: UsersController;

  const requestMock = {
    query: {},
  } as unknown as Request

  let randomNumber = Math.floor(Math.random() * 10000);

  const requestMockWithRandomNumber = {
    query: {since: randomNumber},
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

  it('should be able to list users, 9 at a time', () => {
    return controller.list(requestMock)
    .then((list) => {
      expect(list).toHaveLength;
      expect(list.length).toBe(9);
    })
  })
  
  it('should be able to list users, 9 at a time, starting from ', () => {
    return controller.list(requestMockWithRandomNumber)
    .then((list) => {
      expect(list).toHaveLength;
      expect(list.length).toBe(9);
      expect(list[0].id).toBeGreaterThan(randomNumber)
    })
  })
});
