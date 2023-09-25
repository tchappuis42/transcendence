import { Body, Controller, Get, Post } from '@nestjs/common';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
	constructor(private readonly gameService: GameService) { }

	@Post('user')
	async getGameByUser() {
		const games = await this.gameService.getGameByUser(1);
		return games;
	}
}
