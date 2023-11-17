import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friends } from './friends.entity';
import { FriendsController } from './friends.controller';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Friends])],
  controllers: [FriendsController],
  providers: [FriendsService, UserService]
})
export class FriendsModule { }
