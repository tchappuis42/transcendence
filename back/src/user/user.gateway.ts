import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserService } from "./user.service";
import { sockets } from "./dtos/socketsDto";

@WebSocketGateway({
	// cors: {
	// 	origin: ['http://c1r15s5']
	// }
})

export class UserGateway implements OnGatewayConnection, OnGatewayDisconnect {
	constructor(private readonly userService: UserService) { }

	@WebSocketServer()
	server: Server;

	//connection
	async handleConnection(@ConnectedSocket() client: Socket) {
		try {
			Logger.log(client.id, "CLIENT CONNECTED")
			const id = parseInt(client.handshake.query.user as string);
			const user = await this.userService.validateUser(id);
			client.data.user = user;
			client.join(client.data.user.id.toString())
			await this.userService.addUser(user.id, client, this.server);
		} catch { }
	}

	//deconnexionls
	async handleDisconnect(client: Socket) {
		try {
			Logger.log(client.id, "CLIENT DISCONNECTED")
			await this.userService.removeUser(client, this.server);
			client.leave(client.data.user.id.toString())
		} catch { }
	}
}