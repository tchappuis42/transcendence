import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserService } from "./user.service";

@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000']
	}
})

export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(private readonly userService: UserService) { }

	@WebSocketServer()
	server: Server;

	//connection
	async handleConnection(@ConnectedSocket() socket: Socket) {
		const username = socket.handshake.query.user as string;
		const user = await this.userService.validateUser(username);
		socket.data.user = user;
		Logger.log(socket.id, "CLIENT CONNECTED")
	}

	//deconnexionls
	handleDisconnect(client: Socket) {
		Logger.log(client.id, "CLIENT DISCONNECTED")
	}
}