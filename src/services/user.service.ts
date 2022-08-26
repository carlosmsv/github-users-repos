import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user';


@Injectable()
export class UserService {

    private readonly url = 'https://api.github.com/users';

    public async listUsers(since: number): Promise<User[]> {
      const usersUrl = `${this.url}?since=${since}&per_page=9`;

      const users: User[] = await axios.get(usersUrl).then(response => {
          return response.data;
      }).catch(err => console.error(err));
      
      return users;
    }

    public async getUser(login: string): Promise<User> {
      const userUrl = `${this.url}/${login}`;

      const user: User = await axios.get(userUrl).then(response => {
          return response.data;
      }).catch(err => console.error(err));

      return user;
  }

}
