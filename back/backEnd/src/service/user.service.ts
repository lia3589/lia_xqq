import { Provide } from '@midwayjs/decorator';
// import { InjectEntityModel } from '@midwayjs/typeorm';
// import { Repository } from 'typeorm';
// import { User } from '../model/user.model';

@Provide()
export class UserService {
  private users = [
    { username: 'user1', password: '1' },
    { username: 'user2', password: '2' },
  ];

  async findUser(username: string, password: string) {
    return this.users.find(u => u.username === username && u.password === password);
  }

  async addUser(username: string, password: string) {
    this.users.push({ username, password });
  }

  async updateUser(username: string, newPassword: string) {
    const user = this.users.find(u => u.username === username);
    if (user) {
      user.password = newPassword;
      return true;
    }
    return false;
  }
}
