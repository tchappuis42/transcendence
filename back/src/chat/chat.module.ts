import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TextChannelService } from './services/textChannel.service';
import { TextChannel } from './entity/textChannel';
import { UserService } from 'src/user/user.service';
import { MeController } from './controllers/me.controller';
import { IdController } from './controllers/id.controller';


@Module({
  imports: [TypeOrmModule.forFeature([User, TextChannel])],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, UserService, TextChannelService],
})
export class ChatModule {}
