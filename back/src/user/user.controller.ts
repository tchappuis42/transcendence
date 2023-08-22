import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor, UploadedFile, UseGuards, Res, Logger, Req } from '@nestjs/common';
import { SignupDto } from '../authentication/dtos/signupDto';
import { UserService } from './user.service';
import { LoginDto } from '../authentication/dtos/loginDto';
import { AvatarDto } from './dtos/AvatarDto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './user.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dtos/UserDto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService, private readonly jwtService: JwtService) { }

	@UseGuards(JwtAuthGuard)
	@Get("/me")
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	getProfile(@Req() req: Request) {
		return req.user
	}

	@Post("/avatar")
	@UseInterceptors(FileInterceptor('files'))
	uploadFile(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
		//console.log(file);
		//async postAvatar(@Body() body : any){
		return body
	}

	@UseGuards(JwtAuthGuard)
	@Get("/users")
	async getUsers(@Req() req: Request) {
		const user = req.user;
		return req.user
		//return await this.userService.getUsers(body)
	}
}
