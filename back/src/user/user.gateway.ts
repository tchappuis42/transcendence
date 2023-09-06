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
	handleConnection(@ConnectedSocket() socket: Socket) {
		const user = socket.handshake.query.user as string;
		this.userService.SocketConnect(socket, user);
		console.log("client Connected:", socket.id, user)
	}

	//deconnexion
	handleDisconnect(client: Socket) {
		this.userService.SocketDisconnect(client)
		Logger.log("client disconnected:", client.id)
	}
}