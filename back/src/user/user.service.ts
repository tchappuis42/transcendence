import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dtos/UserDto';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Game } from 'src/game/game.entity';
import { Server, Socket } from 'socket.io';
import { sockets } from './dtos/socketsDto';
import { ConnctionState } from './dtos/ConnectionStateEnum';
import { stat } from 'fs';


@Injectable()
export class UserService {

	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

	Sockets: sockets[] = [];

	async validateUser(id: number): Promise<User> {
		const user = await this.usersRepository.findOne({ where: { id: id } })
		if (!user) throw new NotFoundException("user not found")
		return user;
	}

	async validateUserByName(name: string): Promise<User> {
		const user = await this.usersRepository.findOne({ where: { username: name } })
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
	async usersListe(id: number) {
		const users = await this.usersRepository.find()
		const liste = users.map((user) => ({ username: user.username, status: user.connected, id: user.id }))
		const withoutMe = liste.filter((me) => me.id !== id)
		return withoutMe
	}

	async addUser(userId: number, client: Socket, server: Server) {
		const user = await this.usersRepository.findOne({ where: { id: userId } });
		if (user) {
			user.socket.push(client.id)
			if (user.connected === ConnctionState.Offline) {
				user.connected = ConnctionState.Online
				Logger.log("user connected")
			}
			await this.usersRepository.save(user);
			const status = {
				id: userId,
				status: ConnctionState.Online
			}
			server.emit('status', status)
		}
		console.log("lalal", user.socket)
	}

	async removeUser(client: Socket, server: Server) {
		const user = await this.usersRepository.findOne({ where: { id: client.data.user.id } });
		if (user) {
			user.socket = user.socket.filter((socket) => socket !== client.id);
			if (user.socket.length === 0) {
				user.connected = ConnctionState.Offline
				Logger.log("user disconnected")
			}
			await this.usersRepository.save(user);
			const status = {
				id: client.data.user.id,
				status: ConnctionState.Offline
			}
			server.emit('status', status)
		}
	}

	async StatueGameOn(userId: number, server: Server) {
		const user = await this.usersRepository.findOne({ where: { id: userId } })
		if (!user) throw new NotFoundException("user not found")
		await this.usersRepository.update(user.id, { connected: ConnctionState.InGame })
		const status = {
			id: user.id,
			status: ConnctionState.InGame
		}
		server.emit('status', status)
	}

	async StatueGameOff(userId: number, server: Server) {
		const userStatue = await this.userStatue(userId)
		if (userStatue === ConnctionState.InGame) {
			await this.usersRepository.update(userId, { connected: ConnctionState.Online })
			const status = {
				id: userId,
				status: ConnctionState.Online
			}
			server.emit('status', status)
		}
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

	async getUserById(userId: number) {
		const getInfo = await this.usersRepository.findOne({ where: { id: userId } })
		if (!getInfo)
			throw new NotFoundException("user not found")
		return getInfo
	}

	async userStatue(userId: number) {
		const user = await this.usersRepository.findOne({ where: { id: userId } })
		if (!user)
			throw new NotFoundException("user not found")
		return user.connected
	}
}
