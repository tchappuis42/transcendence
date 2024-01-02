import { ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { LoginDto } from './dtos/loginDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt"
import { JwtService } from '@nestjs/jwt';
import { authenticator } from 'otplib';
import axios from "axios";
import * as dotenv from "dotenv"

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private usersRepository: Repository<User>, private jwtService: JwtService) { }

	async postSignup(body: SignupDto): Promise<string> {
		try {
			const { password } = body
			const hash = await bcrypt.hash(password, 10)
			const user = this.usersRepository.create({ ...body, password: hash, username: body.identifiant })
			await this.usersRepository.save(user)
			return "User Created!"
		} catch (error) {
			throw new ConflictException(error.driverError.detail) // peux mieux faire
			// console.error(error); // Log l'erreur dans la console
		}
	}

	async postLogin(body: LoginDto) {
		const { password, identifiant } = body
		const user = await this.usersRepository.findOne({ where: { identifiant: identifiant } })
		if (!user)
			throw new NotFoundException("user not found")
		const match = await bcrypt.compare(password, user.password)
		if (!match)
			throw new UnauthorizedException("Ivalide password")

		const payload = { sub: user.id, identifiant: user.identifiant };
		return {
			access_token: await this.jwtService.signAsync(payload),
			user: user
		}
	}

	async postTwoFa(user: User, token: string) {
		const isCodeValid = authenticator.verify({
			token: token,
			secret: user.twoFaSecret,
		});
		if (!isCodeValid) {
			throw new UnauthorizedException('Wrong authentication code');
		}
		const payload = { sub: user.id, username: user.username };
		return await this.jwtService.signAsync(payload)
	}

	async getToken(code: string) {

		//code qui effectue la requete a l api 42 pour obtenir un token en retour. 
		dotenv.config();
		const url = 'https://api.intra.42.fr/oauth/token';

		const data = new URLSearchParams();
		data.append('grant_type', 'authorization_code');
		data.append('client_id', process.env.API_UID);
		data.append('client_secret', process.env.API_SECRET);
		data.append('code', code);
		data.append('redirect_uri', process.env.API_REDIRECT_URL);

		try {
			const response = await axios.post(url, data);

			return response.data;
		} catch (error) {
			console.error(error);
			// Handle any errors here
			throw error;
		}
	}

	async getUserInfo(token: string) {
		const url = 'https://api.intra.42.fr/v2/me';

		try {
			const response = await axios.get(url, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			// Handle any errors here
			throw error;
		}
	}

	async loginOrCreate(id: number, loginname: string, infos: any = {}) {
		try {
			const user = await this.usersRepository.findOne({ where: { id: id } })
			
			if (user != null) {
				const payload = { sub: user.id, identifiant: user.identifiant };
				return {
					access_token: await this.jwtService.signAsync(payload),
					user: user
				}
			}

			else {
				let avatar = infos.image.link;
				let password = undefined;

				const user = await this.usersRepository.create({ id: id, identifiant: loginname, username: loginname, password: password, avatar: avatar });
				const user2 = await this.usersRepository.save(user);
				const payload = { sub: user2.id, identifiant: user2.identifiant };
				return {
					access_token: await this.jwtService.signAsync(payload),
					user: user2
				}
			}
		} catch { }
	}

}