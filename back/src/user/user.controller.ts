import { Controller, Get, Render, Post, Body, Redirect, UseInterceptors, ClassSerializerInterceptor, Session} from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/loginDto';
import { AvatarDto } from './dtos/AvatarDto';
import { error } from 'console';

@Controller('user')
export class UserController {
	constructor(private readonly userService : UserService) {}

	@Get()
	@Render("user/user")
	getUser(){}

	@Get("/signup")
	@Render("user/signup")
	getSignup(){}

	@Get("/login")
	@Render("user/login")
	getLogin(){}

	@Get("/avatar")
	@Render("user/avatar")
	getAvatar(){}

	@Post("/signup")
	@Redirect("/user/login")
	async postSignup(@Body() body : SignupDto){
		return {message : await this.userService.postSignup(body)}
	}

	@Post("/login")
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	@Redirect("/")
	async postLogin(@Body() body : LoginDto, @Session() session : Record<string, any>){
		const user = await this.userService.postLogin(body)
		session.user = user
		session.connected = true
		return session
	}

	@Post("/logout")
	@Redirect("/")
	postLogout(@Session() session : Record<string, any>) {
		session.destroy(err => {});
	}


	@Post("/avatar")
	async postAvatar(@Body() body : any){
		return body
	}
}
