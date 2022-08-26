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

  it('should be able to list users, 4 at a time', () => {
    return controller.list(requestMock)
    .then((list) => {
      expect(list).toHaveLength;
      expect(list.length).toBe(4);
    })
  })

  it('should be able to list users, 4 at a time, starting from a randomNumber', () => {
    return controller.list(requestMockWithRandomNumber)
    .then((list) => {
      expect(list).toHaveLength(4);
      expect(list[0].id).toBeGreaterThan(randomNumber)
    })
  })

  it('should be able to get user details', () => {
    return controller.details('carlosmsv')
    .then((user) => {
      expect(user).toBeTruthy();
      expect(user.login).toBe('carlosmsv');
      expect(user.id).not.toBeNaN();
    })
  })

  it('should be able to get repositories from user', () => {
    return controller.repositories('carlosmsv')
    .then((repos) => {
      expect(repos).toHaveLength;
    }) 
  })

});
