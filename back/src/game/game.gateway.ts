import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { TestDto } from "src/user/dtos/TestDto";
import { UserService } from "src/user/user.service";

@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000']
	}
})
export class GameGateway {
	constructor(private readonly userService: UserService) { }
	@WebSocketServer()
	server: Server;

	@SubscribeMessage('message')
	handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		//Logger.log("la")
		const user = this.userService.SocketUser(client)
		this.server.emit('message', data, user)
	}

	@SubscribeMessage('test')
	testEvent(@MessageBody() @ConnectedSocket() client: Socket) {
		//Logger.log("lo")
		this.server.emit('test', "la")
	}

	@SubscribeMessage('game')
	testpong(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		Logger.log(data)
		this.server.emit('pong', data)
	}
}