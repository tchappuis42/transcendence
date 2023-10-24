import { Body, Controller, Post, Get, Param, UseGuards, Req } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from 'src/user/user.guard';
import { Request } from 'express';
import { UserDto } from 'src/user/dtos/UserDto';
import { User } from 'src/user/user.entity';
import { AcceptDTO } from './dtos/AcceptDto';

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
	@Post("acceptFriend")
	async acceptFriend(@Body() body: AcceptDTO, @Req() req: Request) {
		const user = req.user as User
		if (body.accept === true)
			return await this.frindsService.acceptFriend(user, body.id)
		return await this.frindsService.refuseFriend(user, body.id)
	}

	@UseGuards(JwtAuthGuard)
	@Post("/removeFriend/:friendName")
	async removeFriend(@Param('friendName') friendName: string, @Req() req: Request) {
		const user = req.user as User
		return await this.frindsService.removeFriend(user, friendName)
	}
}


