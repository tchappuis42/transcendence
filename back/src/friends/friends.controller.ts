
import { Body, Controller, Post, Get, Param, UseGuards, Req, BadRequestException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from 'src/user/user.guard';
import { Request } from 'express';
import { User } from 'src/user/user.entity';
import { AcceptDto } from './dtos/AcceptDto';

@Controller('friends')
export class FriendsController {
	constructor(private readonly frindsService: FriendsService) { }

	@UseGuards(JwtAuthGuard)
	@Post("/addFriend")
	async addFriend(@Body() body: AcceptDto, @Req() req: Request) {
		const user = req.user as User
		return await this.frindsService.addFriend(user, body.id)
	}

	@UseGuards(JwtAuthGuard)
	@Get("friends")
	@UseInterceptors(ClassSerializerInterceptor)
	async getFriends(@Req() req: Request) {
		const user = req.user as User
		const friends = await this.frindsService.getFriends(user)
		return friends;
	}

	@UseGuards(JwtAuthGuard)
	@Post("acceptFriend")
	async acceptFriend(@Body() body: AcceptDto, @Req() req: Request) {
		const user = req.user as User
		if (body.accept === true)
			return await this.frindsService.acceptFriend(user, body.id)
		return await this.frindsService.refuseFriend(user, body.id)
	}

	@UseGuards(JwtAuthGuard)
	@Post("/removeFriend")
	async removeFriend(@Body() body: AcceptDto, @Req() req: Request) {
		const user = req.user as User
		return await this.frindsService.removeFriend(user, body.id)
	}

	@UseGuards(JwtAuthGuard)
	@Get("getFriendParId/:id")
	@UseInterceptors(ClassSerializerInterceptor)
	async getFriendParId(@Req() req: Request, @Param() params: any) {
		const user = req.user as User
		const friend = await this.frindsService.getFriendParId(user, params.id)
		return friend;
	}
}


