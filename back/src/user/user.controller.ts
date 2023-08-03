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
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

	@Post("/signup")
	async postSignup(@Body() body: SignupDto) {
		return { message: await this.userService.postSignup(body) }
	}

	@Post("/login")
	async postLogin(@Body() body: LoginDto, @Res({ passthrough: true }) res: Response): Promise<any> {
		const access_token = await this.userService.postLogin(body);
		res.cookie('access_token', access_token, {
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		});
		return access_token; // msg succes
	}

	@UseGuards(JwtAuthGuard)
	@Get("/me")
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getProfile(@Req() req: Request) {
		return req.user
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
