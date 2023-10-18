import { Controller, Post, Get, Param, UseGuards, Req } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from 'src/user/user.guard';
import { Request } from 'express';
import { UserDto } from 'src/user/dtos/UserDto';
import { User } from 'src/user/user.entity';

@Controller('friends')
export class FriendsController {
	constructor(private readonly frindsService: FriendsService) { }

	@UseGuards(JwtAuthGuard)
	@Post("/addFriend/:friendName")
	async addFriend(@Param('friendName') friendName: string, @Req() req: Request) {
		const user = req.user as User
		return await this.frindsService.addFriend(user, friendName)
	}

	@UseGuards(JwtAuthGuard)
	@Get("friends")
	async getFriends(@Req() req: Request) {
		const user = req.user as User
		const friends = await this.frindsService.getFriends(user)
		return friends;
	}

	@UseGuards(JwtAuthGuard)
	@Post("/acceptFriend/:friendName")
	async acceptFriend(@Param('friendName') friendName: string, @Req() req: Request) {
		const user = req.user as User
		return await this.frindsService.acceptFriend(user, friendName)
	}

	@UseGuards(JwtAuthGuard)
	@Post("/removeFriend/:friendName")
	async removeFriend(@Param('friendName') friendName: string, @Req() req: Request) {
		const user = req.user as User
		return await this.frindsService.removeFriend(user, friendName)
	}
}


