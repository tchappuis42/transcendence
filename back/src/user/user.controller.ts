import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor, UploadedFile, UseGuards, Res, Logger, Req } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/loginDto';
import { AvatarDto } from './dtos/AvatarDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './auth.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
	private jwtService: JwtService;
	constructor(private readonly userService: UserService) { }

	@Get("/test")
	gettest() { }

	@Post("/signup")
	async postSignup(@Body() body: SignupDto) {
		return { message: await this.userService.postSignup(body) }
	}

	@Post("/login")
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async postLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<any> {
		const access_token = await this.userService.postLogin(body);
		res.cookie('access_token', access_token.access_token, {
			httpOnly: true,
			secure: false
		});
		return access_token;
	}

	//@UseGuards(JwtAuthGuard)
	@Get("/me")
	async getProfile(@Req() req: Request, @Req() request: any) {
		Logger.log(req.cookies);
		//Logger.log(req.cookies['access_token']);

		//Logger.log(request.headers.cookie);

		//const cookie = request.headers.cookie;
		//Logger.log("cookie = ", cookie);
		//const parts = cookie.split('=');
		//const key = parts[0].trim();
		//const value = parts[1].trim();
		//Logger.log("value = ", value);
		/*const data = await this.jwtService.verifyAsync(value);
		Logger.log("data = ", data);
		return data*/

		/*
		const token = req.cookies['access_token'];
		if (token) {
			const data = await this.jwtService.verifyAsync(token);
			return data;
		}*/
	}

	//todo a faire



	@Post("/logout")
	postLogout() {
	}


	@Post("/avatar")
	@UseInterceptors(FileInterceptor('files'))
	uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
		//console.log(file);
		//async postAvatar(@Body() body : any){
		return body
	}
}
