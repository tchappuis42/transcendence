import { ConflictException, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { SignupDto } from '../authentication/dtos/signupDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { LoginDto } from '../authentication/dtos/loginDto';
import { AvatarDto } from './dtos/AvatarDto';
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dtos/UserDto';


@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

	async validateUser(username: string): Promise<UserDto> {
		const user = await this.usersRepository.findOne({ where: { username: username } })
		if (!user) throw new NotFoundException("user not found")
		return user;
	}

	async getUsers(user: UserDto) {
		const currentUser = user.username;
		return currentUser
	}
}


/*async postAvatar(body: AvatarDto) {
	const {avatar} = body
	const user = this.usersRepository.create({...body})
	await this.usersRepository.save(user)
	return "avatar mis a jour"
}*/

