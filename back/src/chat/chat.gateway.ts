import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { TestDto } from "src/user/dtos/TestDto";

export class ChatGateway {

	@WebSocketServer()
	server: Server;

	@SubscribeMessage('message')
	handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		this.server.emit('message', data, client.id)
	}
}
