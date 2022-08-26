import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user';
import { Repository } from '../models/repository';

const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
@Injectable()
export class UserService {

    private readonly url = 'https://api.github.com/users';

    public async listUsers(since: number): Promise<User[]> {
      const usersUrl = `${this.url}?since=${since}&client_id=${githubClientId}&client_secret=${githubClientSecret}&per_page=4`;

      const users: User[] = await axios.get(usersUrl).then(response => {
          return response.data;
      }).catch(err => console.error(err));
      
      return users;
    }

    public async getUser(login: string): Promise<User> {
      const userUrl = `${this.url}/${login}?client_id=${githubClientId}&client_secret=${githubClientSecret}`;

      const user: User = await axios.get(userUrl).then(response => {
          return response.data;
      }).catch(err => console.error(err));

      return user;
  }

  public async listRepositories(login: string): Promise<Repository[]> {

    const reposUrl = `${this.url}/${login}/repos?client_id=${githubClientId}&client_secret=${githubClientSecret}`;

    const repositories: Repository[] = await axios.get(reposUrl).then(response => {
        return response.data;
    }).catch(err => console.error(err));

    return repositories;
}

}
