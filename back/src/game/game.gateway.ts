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

	async handleConnection(@ConnectedSocket() socket: Socket) {
		//Logger.log(socket.id, "CLIENT CONNECTED")
	}

	//deconnexion
	handleDisconnect(client: Socket) {
		this.gameService.cleanMM(client);
	}

	@SubscribeMessage('message')
	async handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		this.server.emit('message', data, user.username)
	}

	@SubscribeMessage('matchmaking')
	matchmaking(@ConnectedSocket() client: Socket) {
		console.log("matchmaking")
		const user = client.data.user as UserDto;
		const game = this.gameService.matchmaking(user, client);
		if (typeof game === 'object')
			this.server.to(game.roomName).emit('game', game)
		if (typeof game === 'string')
			this.server.to(client.id).emit('game', game)
	}

	@SubscribeMessage('clean')
	clean(@ConnectedSocket() client: Socket) {
		console.log("clean")
		this.gameService.clean(client);
	}

	@SubscribeMessage('gamelife')
	gamelife(@ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const game = this.gameService.findRoom(client);
		//console.log(game)
		this.server.to(game.name).emit('gamelife', user.username);
	}

	@SubscribeMessage('paddle')
	paddle(@MessageBody() data: string, @ConnectedSocket() client: Socket,) {
		console.log(data)
		const game = this.gameService.findRoom(client);
		console.log(game.name)
		this.server.to(game.name).emit('paddle', data)

	}
}