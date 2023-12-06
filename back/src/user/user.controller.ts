import { Controller, Get, UseInterceptors, ClassSerializerInterceptor, UseGuards, Req, Param, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from './user.guard';
import { Request } from 'express';
import { UserDto } from './dtos/UserDto';
import { User } from './user.entity';
import { FriendsService } from 'src/friends/friends.service';

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

	@UseGuards(JwtAuthGuard)
	@Get("/2fa")
	async get2fa(@Req() req: Request) {
		const user = req.user as UserDto;
		const code = await this.userService.generateTfaSecret(user.username);
		const qrcode = this.userService.generateQrCode(code);
		return qrcode
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
	@Get('block/:id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async blockById(@Req() req: Request, @Param('id') blockId: number) {
		console.log(blockId)
		const user = req.user as User;
		await this.friendService.removeFriend(user, blockId);
		return await this.userService.blockbyId(user.id, blockId);
	}

	@UseGuards(JwtAuthGuard)
	@Get('unblock/:id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async unblockById(@Req() req: Request, @Param('id') unblockId: number) {
		const user = req.user as UserDto;
		return await this.userService.unblockbyId(user.id, unblockId);
	}

	@UseGuards(JwtAuthGuard)
	@Get('getUserBlocked')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getUserBlocked(@Req() req: Request) {
		const user = req.user as UserDto;
		return await this.userService.getUserBlocked(user.id);
	}

	@Get(':id')
	@UseInterceptors(ClassSerializerInterceptor)  // pas revoyer le mdp
	async getUserById(@Param() params: any) {
		const userId = parseInt(params.id)
		if (!userId)
			throw new BadRequestException()
		return await this.userService.getUserById(userId);
	}
}
