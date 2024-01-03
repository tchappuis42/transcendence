import { Controller, Get, Body, Post, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req, Param, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './user.guard';
import { Request } from 'express';
import { UserDto } from './dtos/UserDto';
import { User } from './user.entity';
import { AcceptDto } from 'src/friends/dtos/AcceptDto';
import { FriendsService } from 'src/friends/friends.service';
import { settingsDto } from './dtos/settingdDto';
import { TwoFaDto } from './dtos/TwoFaDto';
import { validateTwoFaDto } from './dtos/validateTwoFaDto';
import { TwoFaFalseDto } from './dtos/TwoFaFalseDto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService, private readonly friendService: FriendsService) { }

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
	async changeSettings(@Body() body: settingsDto, @Req() req: Request) {
		const user = req.user as User
		return await this.userService.changeSettings(user.id, body)
	}

	@Get('/byId/:id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getUserById(@Param('id', ParseIntPipe, ParseIntPipe) id: number) {
		if (!id)
			throw new BadRequestException()
		return await this.userService.getUserById(id);
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
	async validateTwoFa(@Body() body: TwoFaDto, @Req() req: Request) {
		const user = req.user as UserDto
		const validation = await this.userService.validateTwoFa(body, user.id)
	}

	@UseGuards(JwtAuthGuard)
	@Get("/twoFaFalse")
	async twoFaFalse(@Req() req: Request) {
		const user = req.user as UserDto
		const validation = await this.userService.twoFaFalse(user.id)
		return (true)
	}

	@UseGuards(JwtAuthGuard)
	@Post("/twoFaTrue")
	async twoFaTrue(@Body() body: TwoFaFalseDto, @Req() req: Request) {
		const user = req.user as UserDto
		const validation = await this.userService.twoFaTrue(user.id, body)
	return (true)
	}

	@UseGuards(JwtAuthGuard)
	@Get('block/:id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas renotvoyer le mdp
	async blockById(@Req() req: Request, @Param('id', ParseIntPipe, ParseIntPipe) blockId: number) {
		const user = req.user as User;
		if (blockId === user.id)
			throw new BadRequestException('same person');
		await this.friendService.removeFriend(user, blockId);
		return await this.userService.blockbyId(user.id, blockId);
	}

	@UseGuards(JwtAuthGuard)
	@Get('unblock/:id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async unblockById(@Req() req: Request, @Param('id', ParseIntPipe, ParseIntPipe) unblockId: number) {
		const user = req.user as UserDto;
		if (unblockId === user.id)
			throw new BadRequestException('same person');
		return await this.userService.unblockbyId(user.id, unblockId);
	}

	@UseGuards(JwtAuthGuard)
	@Get('getUserBlockedOn')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getUserBlockedOn(@Req() req: Request) {
		const user = req.user as UserDto;
		return await this.userService.getUserBlockedOn(user.id, user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('getUserBlocked')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getUserBlocked(@Req() req: Request) {
		const user = req.user as UserDto;
		return await this.userService.getUserBlocked(user.id);
	}

	@UseGuards(JwtAuthGuard)
	@Get('getUserBlockedId/:id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getUserBlockedId(@Req() req: Request, @Param('id', ParseIntPipe, ParseIntPipe) blockedId: number) {
		const user = req.user as UserDto;
		if (blockedId === user.id)
			throw new BadRequestException('same person');
		return await this.userService.getUserBlockedId(user.id, blockedId);
	}

	@UseGuards(JwtAuthGuard)
	@Get("/apiPic")
	async apiPic(): Promise<any> {
		var apiKey = process.env.PIC_UID;
		return { apiKey };
	}
}