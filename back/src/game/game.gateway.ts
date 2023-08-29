import { Logger } from "@nestjs/common";
import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000/game'],
	}
})
export class GameGateway {

	@WebSocketServer()
	server: Server;

	//connection
	handleConnection(client: Socket) {
		Logger.log("client Connected:", client.id)
	}

	//deconnexion
	handleDisConnect(client: Socket) {
		Logger.log("client disconnected:", client.id)
	}
}