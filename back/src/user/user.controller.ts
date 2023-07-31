import { Controller, Get, Post, Body, Request, UseInterceptors, ClassSerializerInterceptor, UploadedFile, UseGuards, Res } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/loginDto';
import { AvatarDto } from './dtos/AvatarDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './auth.guard';
import { Response, response } from 'express';
import { promises } from 'dns';

@Controller('user')
export class UserController {
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
		const access_token = this.userService.postLogin(body);
		res.cookie('access_token', access_token, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			expires: new Date(Date.now() + 1 * 24 * 60 * 1000),
		});
		return access_token;
	}

	@UseGuards(JwtAuthGuard)
	@Get("/me")
	getProfile(@Request() req: any) {
		return req.user;
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
