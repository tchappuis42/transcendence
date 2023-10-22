import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor, UploadedFile, UseGuards, Res, Logger, Req } from '@nestjs/common';
import { UserService } from './user.service';
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
	async getUsers() {
		const users = await this.userService.usersListe();
		return users
	}

	@UseGuards(JwtAuthGuard)
	@Get("/2fa")
	async get2fa(@Req() req: Request) {
		const user = req.user as UserDto;
		const code = await this.userService.generateTfaSecret(user.username);
		const qrcode = this.userService.generateQrCode(code);
		return qrcode
	}
}
