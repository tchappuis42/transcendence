import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";

export const typeormconfig: TypeOrmModuleOptions = {
		type: 'postgres',
		host: 'postgres',
		port: 5432,
		username: 'root',
		password: 'pswd',
		database: 'test',
		entities: [User],
		synchronize: true,
}