import { Module } from '@nestjs/common';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
<<<<<<< HEAD
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [GameController],
  providers: [GameService, GameGateway, UserService]
=======

@Module({
  controllers: [GameController],
  providers: [GameService, GameGateway]
>>>>>>> chat
})
export class GameModule { }
