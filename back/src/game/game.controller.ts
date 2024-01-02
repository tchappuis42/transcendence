import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { GameService } from './game.service';
import { JwtAuthGuard } from 'src/user/user.guard';
import { Request, Response } from 'express';
import { UserDto } from 'src/user/dtos/UserDto';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) { }

	@Get('history/:id')
	async getGameByUser(@Param('id') id: number) {
		const games = await this.gameService.getGameByUser(id);
		return games;
	}
}
