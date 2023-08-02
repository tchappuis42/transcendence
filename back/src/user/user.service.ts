import { ConflictException, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { LoginDto } from './dtos/loginDto';
import { AvatarDto } from './dtos/AvatarDto';
import { JwtService } from '@nestjs/jwt'


@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

	async validateUser(body: LoginDto): Promise<any> {
		const { password, email } = body
		const user = await this.usersRepository.findOne({ where: { email: email } })
		if (!user) throw new NotFoundException("user not found")
		const match = await bcrypt.compare(password, user.password)
		if (!match) throw new UnauthorizedException("Ivalide password")
		return user;
	}

	async postSignup(body: SignupDto): Promise<string> {
		try {
			const { password } = body
			const hash = await bcrypt.hash(password, 10)
			const user = this.usersRepository.create({ ...body, password: hash })
			await this.usersRepository.save(user)
			return "User Created!"
		} catch (error) {
			throw new ConflictException("email deja utilise")
			// console.error(error); // Log l'erreur dans la console
			//throw new Error('Error during signup'); // Renvoie une erreur pour l'afficher dans l'API
		}
	}

	async postLogin(body: LoginDto): Promise<{ access_token: string }> {
		const { password, email } = body
		const user = await this.usersRepository.findOne({ where: { email: email } })
		if (!user) throw new NotFoundException("user not found")
		const match = await bcrypt.compare(password, user.password)
		if (!match) throw new UnauthorizedException("Ivalide password")
		//return la cle jwt au login
		const payload = { sub: user.id, username: user.username, };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}


/*async postAvatar(body: AvatarDto) {
	const {avatar} = body
	const user = this.usersRepository.create({...body})
	await this.usersRepository.save(user)
	return "avatar mis a jour"
}*/

