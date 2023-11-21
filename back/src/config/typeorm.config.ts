import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Game } from "src/game/game.entity";
import { Friends } from "src/friends/friends.entity";
import { User } from "src/user/user.entity";

export const typeormconfig: TypeOrmModuleOptions = {
	type: 'postgres',
	host: 'postgres',
	port: 5432,
	username: 'root',
	password: 'pswd',
	database: 'test',
	entities: [User, Game, Friends],
	synchronize: true,
}