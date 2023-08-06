import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/loginDto';
import { Logger } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private usersService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => {
					// Extraire la valeur du cookie "access_token"
					return request.cookies['access_token'];
				},
			]),
			ignoreExpiration: false,
			secretOrKey: 'test',
		});
	}

	async validate(payload: any) {
		const user = await this.usersService.validateUser(payload.username)
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}