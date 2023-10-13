import { ConflictException, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AvatarDto } from './dtos/AvatarDto';
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dtos/UserDto';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Socket } from 'socket.io';
import { Game } from 'src/game/game.entity';

@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

	async validateUser(id: number): Promise<UserDto> {
		const user = await this.usersRepository.findOne({ where: { id: id } })
		if (!user) throw new NotFoundException("user not found")
		return user;
	}

	async setTfaSecret(secret: string, username: string) {
		const user = await this.usersRepository.findOne({ where: { username: username } })
		await this.usersRepository.update(user.id, { twoFaSecret: secret })
	}

	async generateTfaSecret(username: string) {
		const secret = authenticator.generateSecret();
		const otpauthUrl = authenticator.keyuri(username, 'AUTH_APP_NAME', secret);
		await this.setTfaSecret(secret, username);
		return otpauthUrl
	}

	async generateQrCode(otpauthUrl: string) {
		return toDataURL(otpauthUrl);
	}

	async saveScore(scores: Game) {
		if (scores.scoreOne > scores.scoreTwo) {
			const number = (scores.scoreOne - scores.scoreTwo) * 10;
			const playerOne = await this.usersRepository.findOne({ where: { id: scores.userOne.id } })
			if (!playerOne) {
				throw new Error("joueur non trouve")
			}
			playerOne.score += number;
			await this.usersRepository.save(playerOne);

			const playerTwo = await this.usersRepository.findOne({ where: { id: scores.userTwo.id } })
			if (!playerTwo) {
				throw new Error("joueur non trouve")
			}
			playerTwo.score -= number;
			await this.usersRepository.save(playerTwo);
		}
		else {
			const number = (scores.scoreTwo - scores.scoreOne) * 10;
			const playerOne = await this.usersRepository.findOne({ where: { id: scores.userOne.id } })
			if (!playerOne) {
				throw new Error("joueur non trouve")
			}
			playerOne.score -= number;
			await this.usersRepository.save(playerOne);

			const playerTwo = await this.usersRepository.findOne({ where: { id: scores.userTwo.id } })
			if (!playerTwo) {
				throw new Error("joueur non trouve")
			}
			playerTwo.score += number;
			await this.usersRepository.save(playerTwo);

		}
	}

	async getRanking() {
		const scores = await this.usersRepository.find({ select: { username: true, score: true } })
		scores.sort((a, b) => b.score - a.score)
		return scores
	}
}



/*async postAvatar(body: AvatarDto) {
	const {avatar} = body
	const user = this.usersRepository.create({...body})
	await this.usersRepository.save(user)
	return "avatar mis a jour"
}*/

