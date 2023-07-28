import { Controller, Get, Render, Post, Body, Redirect, UseInterceptors, ClassSerializerInterceptor, Session, UploadedFile } from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/loginDto';
import { AvatarDto } from './dtos/AvatarDto';
import { error } from 'console';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post("/signup")
	//@Redirect("/user/login")
	async postSignup(@Body() body: SignupDto) {
		//return body
		return { message: await this.userService.postSignup(body) }
	}

	@Post("/login")
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	//@Redirect("/")
	async postLogin(@Body() body: LoginDto, @Session() session: Record<string, any>) {
		const user = await this.userService.postLogin(body)
		session.user = user
		//session.connected = true
		return session
	}

	@Post("/logout")
	@Redirect("/")
	postLogout(@Session() session: Record<string, any>) {
		session.destroy(err => { });
	}


	@Post("/avatar")
	@UseInterceptors(FileInterceptor('files'))
	uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
		//console.log(file);
		//async postAvatar(@Body() body : any){
		return body
	}
}
