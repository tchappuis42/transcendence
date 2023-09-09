import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { TestDto } from "src/user/dtos/TestDto";
import { UserDto } from "src/user/dtos/UserDto";
import { UserService } from "src/user/user.service";
import { GameService } from "./game.service";

@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000']
	}
})
export class GameGateway {
	constructor(private readonly userService: UserService, private readonly gameService: GameService) { }
	@WebSocketServer()
	server: Server;

	@SubscribeMessage('message')
	async handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		this.server.emit('message', data, user.username)
	}

	@SubscribeMessage('matchmaking')
	matchmaking(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const game = this.gameService.matchmaking(user, client);
		if (game)
			this.server.to(game.roomName).emit('game', game.Opponent.username)
	}
}