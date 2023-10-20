import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserDto } from "src/user/dtos/UserDto";
import { UserService } from "src/user/user.service";
import { TextChannelService } from './services/textChannel.service';
import { TextChannel } from "./entity/textChannel";
import { channel } from "diagnostics_channel";


@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000']
	}
})

export class ChatGateway {
	constructor(private readonly userService: UserService,
		private readonly textChannelService: TextChannelService) { }

	@WebSocketServer()
	server: Server;


/*	@SubscribeMessage('message')
	handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		this.server.emit('message', data, client.id)
	}*/

	@SubscribeMessage('message')
	async handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		if (data[2] == '0') {
			const user = client.data.user as UserDto;
			const admin = await this.userService.validateUser(user.id);
			const channel = await this.textChannelService.getChannelMe(data[1]);
			await this.textChannelService.addMsgForChannel(data[0], data[1], admin.id);
			console.log("channel dans gateway", channel)
			client.emit('message', data[0], user.username)
			//client.in(channel.name).emit("message", data[0], user.username)
		}
		else {
			const channel = await this.textChannelService.getChannelMe(data[1]);
			console.log("coukie")
			for(let i = 0; channel.msgs[i]; i++){
				client.emit("messages", channel.msgs[i].message, channel.msgs[i].username);
				//client.in(channel.name).emit("messages", channel.msgs[i].message, channel.msgs[i].username)
			}
		}
	}

	@SubscribeMessage('createchannel')
	async createchannel(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		//console.log(name)
		const user = client.data.user as UserDto;
		await this.textChannelService.createChannel(name, user.id);
		const channel = await this.textChannelService.getChannelMe(name);
		const all_channels = await this.textChannelService.getAllChannels();
		this.server.emit('createchannel', all_channels, channel);
		console.log(channel)
	}

	@SubscribeMessage('getChannelMeOne')
	async getChannelMeOne( client: Socket, name: string): Promise<void> {
		try {
			const channel = await this.textChannelService.getChannelMe(name);
			client.emit('getChannelMeOne', channel);
		} catch {}
	}

	@SubscribeMessage('channel')
	async getChannel(id: number): Promise<void> {
		try {
			const channel = await this.textChannelService.getChannel(id, [
				'users',
			]);
			//this.server.emit('channel', channel);
		} catch {}
	}

	@SubscribeMessage('channelMe')
  	async getChannelMe(@ConnectedSocket() client: Socket): Promise<void> {
    try {
		const user = client.data.user as UserDto;
		const channels = await this.textChannelService.getChannelsForUser(
        user.id,
      );
		console.log(channels)
		this.server.emit('channelMe', channels);
    } catch {}
  }

	@SubscribeMessage('deleteChannel')
	async deleteChannel(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const channel = await this.textChannelService.getChannelByName(name);
		await this.textChannelService.deleteChannel(channel.id, admin.id)
		const all_channels = await this.textChannelService.getAllChannels();
		this.server.emit('deleteChannel', all_channels);
	}

	@SubscribeMessage('addUserToChannel')
	async addUserToChannel(@MessageBody() args: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const userAdd = await this.userService.validateUserByName(args[1]);
		const channel = await this.textChannelService.getChannelByName(args[0]);
		await this.textChannelService.addUserToChannel(channel, userAdd.id, admin.id);
	}

	@SubscribeMessage('getAllChannels')
	async getAllChannels(@ConnectedSocket() client: Socket) {
		const all_channels = await this.textChannelService.getAllChannels();
		client.emit('getAllChannels', all_channels);
		console.log(all_channels);
	}

	@SubscribeMessage('removeUserFromChannel')
	async removeUserFromChannel(@MessageBody() args: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const userAdd = await this.userService.validateUserByName(args[1]);
		const channel = await this.textChannelService.getChannelByName(args[0]);
		await this.textChannelService.removeUserFromChannel(channel, userAdd.id, admin.id)
	}

	@SubscribeMessage('addAdmin')
	async addAdmin(@MessageBody() args: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const userAdd = await this.userService.validateUserByName(args[1]);
		const channel = await this.textChannelService.getChannelByName(args[0]);
		await this.textChannelService.addAdmin(channel, userAdd.id, admin.id)
	}

	@SubscribeMessage('removeAdmin')
	async removeAdmin(@MessageBody() args: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const userAdd = await this.userService.validateUserByName(args[1]);
		const channel = await this.textChannelService.getChannelByName(args[0]);
		await this.textChannelService.removeAdmin(channel, userAdd.id, admin.id)
	}
}
