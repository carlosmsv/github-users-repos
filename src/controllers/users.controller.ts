import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param, Req, Header } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Repository } from '../models/repository'

@Controller('api/users')
@ApiTags('Users')
export class UsersController {

    constructor(private readonly userService: UserService) { }

    @Get()
    @ApiOkResponse({
        status: 200,
        description: 'List users',
      })
    @Header('Access-Control-Allow-Origin', '*')
    @ApiQuery({name: 'since', required: false})
    public async list(@Req() request: Request): Promise<User[]> {
        const since = Number(request.query.since ? request.query.since : 9);
        return this.userService.listUsers(since);
    }

    @Get(':login/details')
    @ApiOkResponse({
        status: 200,
        description: 'User details',
      })
    @Header('Access-Control-Allow-Origin', '*')
    public async details(@Param('login') login: string): Promise<User> {
        return this.userService.getUser(login);
    }

    @Get(':login/repos')
    @ApiOkResponse({
        status: 200,
        description: 'List all public repos from a user',
      })
    @Header('Access-Control-Allow-Origin', '*')
    public async repositories(@Param('login') login: string): Promise<Repository[]> {
        return this.userService.listRepositories(login);
    }
    
}
