import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserDto } from "src/user/dtos/UserDto";
import { UserService } from "src/user/user.service";
import { GameService } from "./game.service";

@WebSocketGateway({
	// cors: {
	// 	origin: ['http://c1r15s5']
	// }
})
export class GameGateway {
	constructor(private readonly userService: UserService, private readonly gameService: GameService) { }
	@WebSocketServer()
	server: Server;

	async handleConnection(@ConnectedSocket() socket: Socket) {
	}

	handleDisconnect(client: Socket) {
		this.gameService.cleanMM(client);
	}

	@SubscribeMessage('matchmaking')
	async matchmaking(@ConnectedSocket() client: Socket, @MessageBody() bonusActivate: boolean) {
		const user = client.data.user as UserDto;
		const game = await this.gameService.matchmaking(user, client, this.server, bonusActivate);
		if (typeof game === 'object')
			this.server.to(game.roomName).emit('game', game)
		if (typeof game === 'number')
			this.server.to(client.id).emit('game', game)
	}

	@SubscribeMessage('gamelife')
	gamelife(@ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const game = this.gameService.findRoom(client);
		this.server.to(game.name).emit('gamelife', user.username);
	}

	@SubscribeMessage('action')
	paddle(@MessageBody() data: string, @ConnectedSocket() client: Socket,) {
		this.gameService.paddle(client, data);
	}

	@SubscribeMessage('life')
	life(@ConnectedSocket() client: Socket) {
		const game = this.gameService.findRoom(client);
		this.server.to(game.name).emit('gamelife');
	}

	@SubscribeMessage('info')
	info(@ConnectedSocket() client: Socket) {
		const info = this.gameService.getinfo(client);
		client.emit('info', info);
	}

	@SubscribeMessage('GameInvit')
	async GameInvit(@ConnectedSocket() client: Socket, @MessageBody() data: number) {
		const invit = await this.gameService.GameInvit(client, data);
		if (typeof invit === 'number')
			client.emit('GameInvit', invit)
		else
			this.server.to(data.toString()).emit('GameInvit', invit);
	}

	@SubscribeMessage('JoinGame')
	async JoinGame(@ConnectedSocket() client: Socket, @MessageBody() data: number) {
		const game = await this.gameService.joinGame(client, data, this.server)
		if (game.success)
			this.server.to(game.roomName).emit('JoinGame', game.success);
		else {
			client.emit('JoinGame', game.id);
		}
	}
}