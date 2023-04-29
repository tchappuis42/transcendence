import { Controller, Get, Render, Post, Body, Redirect, UseInterceptors, ClassSerializerInterceptor} from '@nestjs/common';
import { SignupDto } from './dtos/signupDto';
import { UserService } from './user.service';
import { LoginDto } from './dtos/loginDto';

@Controller('user')
export class UserController {
	constructor(private readonly userService : UserService) {}

	@Get("/signup")
	@Render("user/signup")
	getSignup(){}

	@Get("/login")
	@Render("user/login")
	getLogin(){}

	@Post("/signup")
	@Redirect("/user/login")
	async postSignup(@Body() body : SignupDto){
		return {message : await this.userService.postSignup(body)}
	}

	@Post("/login")
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async postLogin(@Body() body : LoginDto){
		return await this.userService.postLogin(body)
	}
}
