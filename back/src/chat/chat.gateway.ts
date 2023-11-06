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
			this.server.to(channel.name).emit('message', data[0], user.username);
		}
		else {
			const channel = await this.textChannelService.getChannelMe(data[1]);
			console.log("coukie")

	//		const all_channels = await this.textChannelService.getAllChannels();
	//		const all = all_channels.map((chan) => { if (chan.name === channel.name) { return { message: chan.msgs, username: chan.msgs}}});
	//		client.emit("messages", all);
			for(let i = 0; channel.msgs[i]; i++){
				client.emit("messages", channel.msgs[i].message, channel.msgs[i].username);
			}
		}
	}

	@SubscribeMessage('createchannel')
	async createchannel(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		if (name[1] != "create a channel!") {
			client.leave(name[1]);
		}
		client.join(name[0]);
		const user = client.data.user as UserDto;
		await this.textChannelService.createChannel(name[0], user.id);
		const channel = await this.textChannelService.getChannelMe(name[0]);
		const all_channels = await this.textChannelService.getAllChannels();
		//for (let i = 0; all_channels[i]; i++) {
		const all = all_channels.map((chan) => { if (chan.status === true) { return { name: chan.name, statue: "Public"}} else  { return { name: chan.name, statue: "Private"}}});
		client.emit('createchannel', all, channel);
		this.server.emit("refreshChannel", all);
		//}
	}

	@SubscribeMessage('getChannelMeOne')
	async getChannelMeOne( client: Socket, name: string): Promise<void> {
		try {
			if (name[1] != "create a channel!") {
				client.leave(name[1]);
			}
			//const user = client.data.user as UserDto;
			client.join(name[0]);
			const channel = await this.textChannelService.getChannelMe(name[0]);
		/*	let passStatue: string;
			if (channel.status === false) {
				passStatue = await this.textChannelService.checkPassWord(channel, name[2]);
			}
			else
				passStatue = "ok";*/
			const user = client.data.user as UserDto;
			let pass: string;
			if (channel.password === null) {
				pass = '0';
			}
			else {
				pass = '1'
			}
			if (channel.owner.username == user.username) {
				client.emit('getChannelMeOne', channel.name, channel.status, '1', pass);//, passStatue);
				//le 1 si le client est le owner
			}
			else {
				client.emit('getChannelMeOne', channel.name, channel.status, '0', pass);//, passStatue);
			}
			console.log(channel)
		//	client.emit('getChannelMeOne', channel.status);
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
		//client.leave(name);
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const channel = await this.textChannelService.getChannelByName(name);
		await this.textChannelService.deleteChannel(channel.id, admin.id)
		const all_channels = await this.textChannelService.getAllChannels();
		//console.log("valeur de la data 0", all_channels[0]
		console.log("meeeeeeeeeeeeeeeerrrrrrrrrrdddddddee")
		//let all: Map<string, string>[]; 
	/*	let all: any[];
		
		for (let i = 0; all_channels[i]; i++) {
			if (all_channels[i].status == true) {
				// all[i] = new Map<string, string>([[all_channels[i].name, "Public"],])
				 all[i].map(all_channels[i].name, "Public")
			}
			else {
				// all[i] = new Map<string, string>([[all_channels[i].name, "Private"],])
				all[i].map(all_channels[i].name, "Private")
			}
		}*/
		const all = all_channels.map((chan) => { if (chan.status === true) { return { name: chan.name, statue: "Public"}} else  { return { name: chan.name, statue: "Private"}}});
		console.log("essai de all ", all);
		client.emit('deleteChannel', all)
		//client.emit('deleteChannel', all_channels);
		client.leave(channel.name);
		if (all_channels[0]) {
			client.join(all_channels[0].name);
		}
		this.server.to(channel.name).emit('deleteChannelForAllUser', all)
		client.in(name).socketsLeave(name);
		this.server.emit("refreshChannel", all);
		this.server.to(channel.name).emit('deleteChannel', all);
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
		/*for (let i = 0; all_channels[i]; i++) {
			if (all_channels[i].status == true) {
				let all = new Map<string, string>([[all_channels[i].name, "Private"],])
				for(let [name, status] of all) {
					console.log(name, status)
					client.emit('getAllChannels', all);
				}
				//client.emit('getAllChannels', all);
			}
			else if(all_channels[i].status == false) {
				let all = new Map<string, string>([[all_channels[i].name, "Public"],])
				for(let [name, status] of all) {
					console.log(name, status)
					client.emit('getAllChannels', all);
				}
			//	client.emit('getAllChannels', all);
			}
	//	for(let [name, status] of all) {
	//		console.log(name, status)
	//	}
	//	client.emit('getAllChannels', all);
		}*/
		const all = all_channels.map((chan) => { if (chan.status === true) { return { name: chan.name, statue: "Public"}} else  { return { name: chan.name, statue: "Private"}}});
	//	for (let i = 0; all_channels[i]; i++) {
			client.emit('getAllChannels', all); //all_channels[i].name, all_channels[i].status);
		//}
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

	@SubscribeMessage('changeStatue')
	async changeStatue(@MessageBody() args1: string, @MessageBody() args2: boolean, @ConnectedSocket()client: Socket) {
		const channel = await this.textChannelService.getChannelByName(args1[0]);
		console.log("avant changeemnt dans le channel", channel.status)
		console.log("sattue avant changement avant chageStatue", args2[1])
		await this.textChannelService.changeStatue(channel, args2[1]);
		const all_channels = await this.textChannelService.getAllChannels();
		const all = all_channels.map((chan) => { if (chan.status === true) { return { name: chan.name, statue: "Public"}} else  { return { name: chan.name, statue: "Private"}}});
		console.log("apres changeemnt dans le channel", channel.status)
		this.server.emit("refreshChannelStatus", all); //channel.name, channel.status);
	}

	@SubscribeMessage('setPassword')
	async setPassword(@MessageBody() args: string, @ConnectedSocket()client: Socket) {
		const channel = await this.textChannelService.getChannelByName(args[0]);
		await this.textChannelService.setPassword(channel, args[1]);
		//console.log(channel)
	}
	
	@SubscribeMessage('checkPass')
	async checkPass(@MessageBody() args: string, @ConnectedSocket()client: Socket) {
		const channel = await this.textChannelService.getChannelByName(args[0]);
		let passStatue: string;
			if (channel.status === false) {
				passStatue = await this.textChannelService.checkPassWord(channel, args[1]);
			}
			else
				passStatue = "ok";
		console.log("la valeur dans passStatue", passStatue)
		client.emit("checkPass", channel.name, passStatue);
	}
}
