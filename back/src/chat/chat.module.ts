import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { TextChannelService } from './services/textChannel.service';
import { TextChannel } from './entity/textChannel';
import { UserService } from 'src/user/user.service';
//import { MeController } from './controllers/me.controller';
//import { IdController } from './controllers/id.controller';
import {Msg} from './entity/Msg.entity'
import { MutedUser } from './entity/muet.entity';
import { BannedUser } from './entity/banned.entity';
import { DMChannel } from './entity/dmChannel.entity';
import { DMChannelService } from './services/DMChannel.service';



@Module({
  imports: [TypeOrmModule.forFeature([User, Msg, TextChannel, MutedUser, BannedUser, DMChannel])],
  controllers: [ChatController],
  providers: [ChatGateway, ChatService, UserService, TextChannelService, DMChannelService],
})
export class ChatModule {}
