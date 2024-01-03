
import { Body, Controller, Post, Get, Param, UseGuards, Req, BadRequestException, UseInterceptors, ClassSerializerInterceptor, ParseIntPipe } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { JwtAuthGuard } from 'src/user/user.guard';
import { Request } from 'express';
import { User } from 'src/user/user.entity';
import { AcceptDto } from './dtos/AcceptDto';
import { addFriendDto } from './dtos/addFriendDto';
import { UserDto } from 'src/user/dtos/UserDto';

@Controller('friends')
export class FriendsController {
	constructor(private readonly frindsService: FriendsService) { }

	@UseGuards(JwtAuthGuard)
	@Post("/addFriend")
	async addFriend(@Body() body: addFriendDto, @Req() req: Request) {
		const user = req.user as User
		if (body.id === user.id)
			throw new BadRequestException('same person');
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
		if (body.id === user.id)
			throw new BadRequestException('same person');
		if (body.accept === true)
			return await this.frindsService.acceptFriend(user, body.id)
		return await this.frindsService.refuseFriend(user, body.id)
	}

	@UseGuards(JwtAuthGuard)
	@Post("/removeFriend")
	async removeFriend(@Body() body: addFriendDto, @Req() req: Request) {
		const user = req.user as User
		if (body.id === user.id)
			throw new BadRequestException('same person');
		return await this.frindsService.removeFriend(user, body.id)
	}

	@UseGuards(JwtAuthGuard)
	@Get("getFriendParId/:id")
	@UseInterceptors(ClassSerializerInterceptor)
	async getFriendParId(@Req() req: Request, @Param('id', ParseIntPipe, ParseIntPipe) id: number) {
		const user = req.user as User
		if (id === user.id)
			throw new BadRequestException('same person');
		const friend = await this.frindsService.getFriendParId(user, id)
		return friend;
	}
}


