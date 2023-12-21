import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as dotenv from "dotenv"

@Injectable()
export class tempJwtStrategy extends PassportStrategy(Strategy, 'temp-jwt') {
	constructor(private usersService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => {
					return request.cookies['2fa_token'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET,
		});
	}

	async validate(payload: any) {
		const user = await this.usersService.validateUser(payload.sub)
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}