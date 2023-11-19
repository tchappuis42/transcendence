import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { AvatarDto } from './dtos/AvatarDto';
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dtos/UserDto';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import { Server, Socket } from 'socket.io';

interface sockets {
	id: string;
	user: User;
}

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

	async addUser(client: Socket, server: Server) {
		const find = this.Sockets.find((element) => element.user.username === client.data.user.username)
		const newUser: sockets = {
			id: client.id,
			user: client.data.user
		}
		this.Sockets.push(newUser);
		if (find === undefined) {
			await this.setConnection(client.data.user)
			const status = {
				username: client.data.user.username,
				status: 1
			}
			server.emit('status', status)
		}
		console.log("find = ", find)
	}

	async removeUser(client: Socket, server: Server) {
		this.Sockets = this.Sockets.filter(element => element.id !== client.id);
		const find = this.Sockets.find((element) => element.user.username === client.data.user.username)
		if (find === undefined) {
			await this.setDisconnect(client.data.user)
			const status = {
				username: client.data.user.username,
				status: 2
			}
			server.emit('status', status)
		}
		//console.log("[] = ", this.Sockets)
	}

	async setConnection(user: UserDto) {
		await this.usersRepository.update(user.id, { connected: 1 })
		//sdasd
		Logger.log("user connected")
	}

	async setDisconnect(user: UserDto) {
		await this.usersRepository.update(user.id, { connected: 2 })
		Logger.log("user disconnected")
	}
}


/*async postAvatar(body: AvatarDto) {
	const {avatar} = body
	const user = this.usersRepository.create({...body})
	await this.usersRepository.save(user)
	return "avatar mis a jour"
}*/

