import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from 'src/user/user.guard';
import { Request, Response } from 'express';
import { UserDto } from 'src/user/dtos/UserDto';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) { }

	@UseGuards(JwtAuthGuard)
	@Get('history')
	async getGameByUser(@Req() req: Request) {
		const user = req.user as UserDto;
		const games = await this.gameService.getGameByUser(user.id);
		return games;
	}
}
