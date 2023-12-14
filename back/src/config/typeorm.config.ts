import * as dotenv from "dotenv"
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TextChannel } from "src/chat/entity/textChannel";
import { Game } from "src/game/game.entity";
import { Friends } from "src/friends/friends.entity";
import { User } from "src/user/user.entity";
import {Msg} from "src/chat/entity/Msg.entity"
import { MutedUser } from "src/chat/entity/muet.entity";
import { BannedUser } from "src/chat/entity/banned.entity";
import { DMChannel } from "src/chat/entity/dmChannel.entity";

dotenv.config();

export const typeormconfig: TypeOrmModuleOptions = {
		type: 'postgres',
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT || '', 10),
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DATABASE,
		entities: [User, TextChannel, Msg, MutedUser, BannedUser, DMChannel, Game, Friends],
		synchronize: process.env.DB_SYNCHRONIZE === 'true',
};
