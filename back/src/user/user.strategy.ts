import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dtos/loginDto';
import { Logger } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	usersRepository: any;
	constructor(private readonly userService: UserService) {
		Logger.log("test")
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: "test",
		});
		Logger.log("test2")
	}

	async validate(payload: any) {
		Logger.log("test3")
		const user = await this.usersRepository.findOne({ where: { username: payload.username } })
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}