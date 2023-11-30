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
	async handleConnection(@ConnectedSocket() client: Socket) {
		Logger.log(client.id, "CLIENT CONNECTED")
		const id = parseInt(client.handshake.query.user as string);
		const user = await this.userService.validateUser(id);
		client.data.user = user;
		await this.userService.addUser(user.id, client, this.server);
	}

	//deconnexionls
	async handleDisconnect(client: Socket) {
		Logger.log(client.id, "CLIENT DISCONNECTED")
		await this.userService.removeUser(client, this.server);

	}
}