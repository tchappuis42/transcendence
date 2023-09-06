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

interface SocketUser {
	socket: Socket;
	user: string;
}

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

	socketUsers: SocketUser[] = [];

	async validateUser(username: string): Promise<UserDto> {
		const user = await this.usersRepository.findOne({ where: { username: username } })
		if (!user) throw new NotFoundException("user not found")
		return user;
	}

	async setTfaSecret(secret: string, email: string) {
		const user = await this.usersRepository.findOne({ where: { email: email } })
		await this.usersRepository.update(user.id, { twoFaSecret: secret })
	}

	async generateTfaSecret(email: string) {
		const secret = authenticator.generateSecret();
		const otpauthUrl = authenticator.keyuri(email, 'AUTH_APP_NAME', secret);
		await this.setTfaSecret(secret, email);
		return otpauthUrl
	}

	async generateQrCode(otpauthUrl: string) {
		return toDataURL(otpauthUrl);
	}

	SocketConnect(client: Socket, username: string) {
		let element: SocketUser = {
			socket: client,
			user: username
		}
		this.socketUsers.push(element);
		console.log(this.socketUsers)
	}

	SocketDisconnect(client: Socket) {
		this.socketUsers = this.socketUsers.filter((element) => element.socket !== client)
	}

	SocketUser(client: Socket) {
		const find = this.socketUsers.find((element) => element.socket.id === client.id)
		if (find)
			console.log(find.user)
		return "find.user";
	}
}


/*async postAvatar(body: AvatarDto) {
	const {avatar} = body
	const user = this.usersRepository.create({...body})
	await this.usersRepository.save(user)
	return "avatar mis a jour"
}*/

