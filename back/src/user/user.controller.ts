import { Controller, Get, Render, Post, Body, Request, UseInterceptors, ClassSerializerInterceptor, UploadedFile, UseGuards } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/loginDto';
import { AvatarDto } from './dtos/AvatarDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from './auth.guard';

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
	async postLogin(@Body() body: LoginDto) {
		return this.userService.postLogin(body);
	}

	@UseGuards(AuthGuard)
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
