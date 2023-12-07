import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ILike, Like, Repository } from 'typeorm';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Game } from 'src/game/game.entity';
import { Server, Socket } from 'socket.io';
import { sockets } from './dtos/socketsDto';
import { ConnctionState } from './dtos/ConnectionStateEnum';
import { elementAt } from 'rxjs';

interface changeObj {
	value: string;
	type: boolean;
}

interface twoFa {
	code: string;
	validation: number;
}

interface validateTwoFa {
	value: boolean;
	secret: string;
}

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>) { }

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

	async setTfaSecret(secret: string, id: number) {
		const user = await this.usersRepository.findOne({ where: { id: id } })
		await this.usersRepository.update(user.id, { twoFaSecret: secret })
	}

	async generateTfaSecret(id: number, username: string) {
		const secret = authenticator.generateSecret();
		console.log("secret :", secret);
		const otpauthUrl = authenticator.keyuri(username, 'AUTH_APP_NAME', secret);
		// await this.setTfaSecret(secret, id);
		const secretTfaObj = {
			secret: secret,
			otpauthUrl: otpauthUrl
		}
		return secretTfaObj
	}

	async generateQrCode(otpauthUrl: string) {
		return toDataURL(otpauthUrl);
	}

	async usersListe(id: number) {
		const users = await this.usersRepository.find()
		const liste = users.map((user) => ({ username: user.username, status: user.status, id: user.id, avatar: user.avatar }))
		const withoutMe = liste.filter((me) => me.id !== id)
		return withoutMe
	}

	async addUser(userId: number, client: Socket, server: Server) {
		const user = await this.usersRepository.findOne({ where: { id: userId } });
		if (user) {
			if (user.status === ConnctionState.Offline) {
				user.status = ConnctionState.Online
				Logger.log("user connected")
			}
			const newSocket = new sockets
			newSocket.id = client.id
			newSocket.userid = userId
			this.Sockets.push(newSocket); //debug/
			//user.socket.push(client.id)
			user.socket = this.getsocketInArray(user.id)
			await this.usersRepository.save(user);
			const status = {
				id: userId,
				status: ConnctionState.Online
			}
			server.emit('status', status)
		}
	}

	async removeUser(client: Socket, server: Server) {
		this.Sockets = this.Sockets.filter(element => element.id !== client.id); //debug
		const user = await this.usersRepository.findOne({ where: { id: client.data.user.id } });
		if (user) {
			user.socket = this.getsocketInArray(user.id)
			//user.socket = user.socket.filter((socket) => socket !== client.id) ;
			if (user.socket.length === 0) {
				user.status = ConnctionState.Offline
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
		await this.usersRepository.update(user.id, { status: ConnctionState.InGame })
		const status = {
			id: user.id,
			status: ConnctionState.InGame
		}
		server.emit('status', status)
	}

	async StatueGameOff(userId: number, server: Server) {
		const userStatue = await this.userStatue(userId)
		if (userStatue === ConnctionState.InGame) {
			await this.usersRepository.update(userId, { status: ConnctionState.Online })
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
			if (playerTwo.score < 0)
				playerTwo.score = 0;
			await this.usersRepository.save(playerTwo);
		}
		else {
			const number = (scores.scoreTwo - scores.scoreOne) * 10;
			const playerOne = await this.usersRepository.findOne({ where: { id: scores.userOne.id } })
			if (!playerOne) {
				throw new Error("joueur non trouve")
			}
			playerOne.score -= number;
			if (playerOne.score < 0)
				playerOne.score = 0;
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
		const scores = await this.usersRepository.find({ select: { username: true, score: true, id: true, avatar: true } })
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
		return user.status
	}

	async searchUsers(userId: number, query: string) {
		const users = await this.usersRepository.find({
			where: [
				{ username: ILike(`%${query}%`) },
			],
			//TODO Rajouter photo de profil
			select: ['id', 'username', "avatar"],
		});

		const filteredUsers = users.filter((user) => user.id !== userId);

		return filteredUsers;
	}

	async getSocketUser(userId: number) {
		const userSocket = await this.usersRepository.findOne({ where: { id: userId }, select: { socket: true } })
		if (userSocket)
			return userSocket
		return null
	}

	async unblockbyId(id: number, unblockId: number) {
		const user = await this.usersRepository.findOne({ where: { id: id } });
		if (!user) {
			return { success: false, message: "User not found" };
		}
		user.blockedId = user.blockedId.filter((blockedId) => blockedId !== unblockId)
		await this.usersRepository.save(user);
		return { success: true, message: "User unblocked" };
	}

	async blockbyId(id: number, blockId: number) {
		const user = await this.usersRepository.findOne({ where: { id: id } });
		if (!user) {
			return { success: false, message: "User not found" };
		}
		user.blockedId.push(blockId);
		await this.usersRepository.save(user);
		return { success: true, message: "User blocked" };
	}

	async getUserBlocked(id: number) {
		const user = await this.usersRepository.findOne({ where: { id: id } });
		if (user.blockedId.length)
			return user.blockedId
	}

	//debug
	async clearsocket(userId: number) {
		const user = await this.usersRepository.findOne({ where: { id: userId } })
		user.socket = [];
		await this.usersRepository.save(user);
		console.log("clear", user.socket)
	}

	getsocketInArray(userId: number) {
		const userSocket = this.Sockets.filter(socket => socket.userid === userId)
		const socket = userSocket.map((socket) => (socket.id))
		return socket
	}

	async changeSettings(userId: number, body: changeObj) {
		try {
			if (body.type)
				await this.usersRepository.update(userId, { avatar: body.value })
			if (!body.type) {
				if (body.value.length < 4 || body.value.length > 15)
					throw new BadRequestException("Username must contain 3 to 15 caracter")
				await this.usersRepository.update(userId, { username: body.value })
			}
		}
		catch (error) {
			if (error instanceof BadRequestException)
				throw error
			throw new ConflictException(error.driverError.detail) // peux mieux faire
		}
	}

	async validateTwoFa(twoFa: twoFa, userId: number) {
		const isCodeValid = authenticator.verify({
			token: twoFa.validation.toString(),
			secret: twoFa.code,
		});
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		//await this.usersRepository.update(userId, { twoFaSecret: twoFa.code })
	}

	async twoFaFalse(twoFaStatus: validateTwoFa, userId: number) {
		console.log("twofa status = ", twoFaStatus)
		const response = await this.usersRepository.update(userId, { twoFa: twoFaStatus.value, twoFaSecret: twoFaStatus.secret })
		console.log("back response : ", response)
	}
}


