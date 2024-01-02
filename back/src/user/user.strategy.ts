import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dtos/UserDto';
import * as dotenv from "dotenv"

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private usersService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => {
					return request.cookies['access_token'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		const user = await this.usersService.validateUserJwt(payload.sub)
		if (!user) {
			throw new UnauthorizedException();
		}
		return user
	}
}