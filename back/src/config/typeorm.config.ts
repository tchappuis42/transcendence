import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { TextChannel } from "src/chat/entity/textChannel";
import { User } from "src/user/user.entity";
import {Msg} from "src/chat/entity/Msg.entity"


export const typeormconfig: TypeOrmModuleOptions = {
		type: 'postgres',
		host: 'postgres',
		port: 5432,
		username: 'root',
		password: 'pswd',
		database: 'test',
		entities: [User, TextChannel, Msg],
		synchronize: true,
		//logging: true,
}