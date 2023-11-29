import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TextChannel } from "src/chat/entity/textChannel";
import { Game } from "src/game/game.entity";
import { Friends } from "src/friends/friends.entity";
import { User } from "src/user/user.entity";
import {Msg} from "src/chat/entity/Msg.entity"
import { MutedUser } from "src/chat/entity/muet.entity";
import { BannedUser } from "src/chat/entity/banned.entity";
import { DMChannel } from "src/chat/entity/dmChannel.entity";


export const typeormconfig: TypeOrmModuleOptions = {
		type: 'postgres',
		host: 'postgres',
		port: 5432,
		username: 'root',
		password: 'pswd',
		database: 'test',
		entities: [User, TextChannel, Msg, MutedUser, BannedUser, DMChannel, Game, Friends],
		synchronize: true,
		//logging: true,
}