import { ConflictException, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AvatarDto } from './dtos/AvatarDto';
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dtos/UserDto';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';


@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

	async validateUser(username: string): Promise<UserDto> {
		const user = await this.usersRepository.findOne({ where: { username: username } })
		if (!user) throw new NotFoundException("user not found")
		return user;
	}

	async setTwoFactorAuthenticationSecret(secret: string, userId: number) {
		await this.usersRepository.update(userId, { twoFaSecret: secret })
	}

	async generateTwoFactorAuthenticationSecret(user: UserDto) {
		const secret = authenticator.generateSecret();

		const otpauthUrl = authenticator.keyuri(user.email, 'AUTH_APP_NAME', secret);

		await this.setTwoFactorAuthenticationSecret(secret, user.id);

		return {
			secret,
			otpauthUrl
		}
	}

	async generateQrCode(twoFaSecret: string) {
		return toDataURL(twoFaSecret);
	}


}


/*async postAvatar(body: AvatarDto) {
	const {avatar} = body
	const user = this.usersRepository.create({...body})
	await this.usersRepository.save(user)
	return "avatar mis a jour"
}*/

