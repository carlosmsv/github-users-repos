import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersController } from './controllers/users.controller';
import { UserService } from './services/user.service';

@Module({
  imports: [],
  controllers: [AppController, UsersController],
  providers: [UserService],
})
export class AppModule {}
