import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor, UploadedFile, UseGuards, Res, Logger, Req, Param, BadRequestException } from '@nestjs/common';
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

	@UseGuards(JwtAuthGuard)
	@Get("/users")
	@UseInterceptors(ClassSerializerInterceptor)
	async getUsers() {
		//return "test"
		return await this.userService.getUsers();
	}

	@UseGuards(JwtAuthGuard)
	@Get(':id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getUserById(@Param() params: any) {
		const userId = parseInt(params.id)
		if (!userId)
			throw new BadRequestException()
		return await this.userService.getUserById(userId);
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
