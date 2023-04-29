import { ConflictException, Injectable , NotFoundException, UnauthorizedException} from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { LoginDto } from './dtos/loginDto';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>,) {}

	async postSignup(body: SignupDto) {
		try{
			const {password} = body
			const hash = await bcrypt.hash(password, 10)
			const user = this.usersRepository.create({...body, password : hash})
			await this.usersRepository.save(user)
			return "User Created!"
		} catch (error) {
			throw new ConflictException("email deja utilise")
		}
	}

	async postLogin(body: LoginDto) {
		const {password, email} = body
		const user = await this.usersRepository.findOne({where : {email : email}})
		if(!user) throw new NotFoundException("user not found")
		const match = await bcrypt.compare(password, user.password)
		if (!match) throw new UnauthorizedException("Ivalide password")
		return user
	}
}
