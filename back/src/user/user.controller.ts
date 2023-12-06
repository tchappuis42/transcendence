import { Controller, Get, Post, Body, UseInterceptors, ClassSerializerInterceptor, UploadedFile, UseGuards, Res, Logger, Req, Param, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from './user.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dtos/UserDto'; import { get } from 'http';
import { User } from './user.entity';
import { AcceptDto } from 'src/friends/dtos/AcceptDto';

class changeObj {
	value: string;
	type: boolean;
}

class TwoFa {
	code: string;
	validation: number;
}

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
	async getUsers(@Req() req: Request) {
		const user = req.user as UserDto;
		const users = await this.userService.usersListe(user.id);
		return users
	}

	@Get("/ranking")
	async getRanking() {
		const rank = await this.userService.getRanking();
		return rank;
	}

	@UseGuards(JwtAuthGuard)
	@Get("/clear")
	async clear(@Req() req: Request) {
		const user = req.user as User;
		this.userService.clearsocket(user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Get("/getUsersByName/:query")
	@UseInterceptors(ClassSerializerInterceptor)
	async getUsersByName(@Req() req: Request, @Param('query') query: string) {
		const user = req.user as UserDto;

		const foundUsers = await this.userService.searchUsers(user.id, query);
		return foundUsers;
	}

	@UseGuards(JwtAuthGuard)
	@Post("/settings")
	async changeSettings(@Body() body: changeObj, @Req() req: Request) {
		const user = req.user as User
		return await this.userService.changeSettings(user.id, body)
	}

	@Get('/byId/:id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getUserById(@Param() params: any) {
		const userId = parseInt(params.id)
		if (!userId)
			throw new BadRequestException()
		return await this.userService.getUserById(userId);
	}

	@UseGuards(JwtAuthGuard)
	@Get("/TwoFa")
	async getQrCode(@Req() req: Request) {
		const user = req.user as UserDto
		const code = await this.userService.generateTfaSecret(user.id, user.username);
		const qrcode = await this.userService.generateQrCode(code.otpauthUrl);
		const twoFaObj = {
			code: code.secret,
			qrcode: qrcode,
		}
		return twoFaObj
	}

	@UseGuards(JwtAuthGuard)
	@Post("/twoFaKey")
	async validateTwoFa(@Body() body: TwoFa, @Req() req: Request) {
		const user = req.user as UserDto
		const validation = await this.userService.validateTwoFa(body, user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Post("/twoFaFalse")
	async twoFaFalse(@Body() body: any, @Req() req: Request) {
		const user = req.user as UserDto
		const validation = await this.userService.twoFaFalse(body, user.id)
		return (true)
	}

}
