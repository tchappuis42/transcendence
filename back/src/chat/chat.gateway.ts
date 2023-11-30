import { Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserDto } from "src/user/dtos/UserDto";
import { UserService } from "src/user/user.service";
import { TextChannelService } from './services/textChannel.service';
import { TextChannel } from "./entity/textChannel";
import { channel } from "diagnostics_channel";
import { Msg } from "./entity/Msg.entity";
import { MutedUser } from "./entity/muet.entity";
import { DMChannelService } from "./services/DMChannel.service";
import { DMChannel } from "./entity/dmChannel.entity";


@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000']
	}
})

@WebSocketGateway({
	cors: {
		origin: ['http://localhost:3000']
	}
})

export class ChatGateway {
	constructor(private readonly userService: UserService,
		private readonly textChannelService: TextChannelService,
		private readonly DMChannelService: DMChannelService) { }

	@WebSocketServer()
	server: Server;

/*	@SubscribeMessage('message')
	handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		console.log("oui js suis la")
		this.server.emit('message', data, client.id)
	}*/

	@SubscribeMessage('message')
	async handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channel = await this.textChannelService.getChannelMe(data[1]);
			const baned = channel.banned.find((banned) => banned.userId == user.id);
			if (!baned) {
				if (data[2] == '0') {
					const admin = await this.userService.validateUser(user.id);
					const muet = channel.muted.find((mueted) => mueted.userId == user.id);
					if (muet) {
						for (let i = 0; channel.muted[i]; i++) {
							if (channel.muted[i].endOfMute <= new Date(Date.now())) 
										await this.textChannelService.unMutedUser(channel, admin, i);
						}
					}
					const channel1 = await this.textChannelService.getChannelMe(data[1]);
					const muet1 = channel1.muted.find((mueted) => mueted.userId == user.id);
					if (!muet1) {
						await this.textChannelService.addMsgForChannel(data[0], data[1], admin.id);
						this.server.to(channel.name).emit('message', data[0], user.username, user.id);
					}
				}
				else {
					const channel = await this.textChannelService.getChannelMe(data[1]);
					const all = channel.msgs.map((e) => {return  { message: e.message, username: e.username, uId: e.userId}})
					client.emit("messages", all);
				}
			}
		} catch {}
	}

	@SubscribeMessage('createchannel')
	async createchannel(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		if (name[1] != "create a channel!")
			client.leave(name[1]);
			
		client.join(name[0]);
		const user = client.data.user as UserDto;
		await this.textChannelService.createChannel(name[0], user.id);
		const channel = await this.textChannelService.getChannelMe(name[0]);
		const all_channels = await this.textChannelService.getAllChannels();
		
		const all = all_channels.map((chan) => { if (chan.status === true) { return { id: chan.id, name: chan.name, statue: "Public"}} else  { return { id: chan.id, name: chan.name, statue: "Private"}}});
		client.emit('createchannel', all, channel.name);
		this.server.emit("refreshChannel", all);
	}

	@SubscribeMessage('getChannelMeOne')
	async getChannelMeOne( client: Socket, name: string): Promise<void> {
		try {
			const channel = await this.textChannelService.getChannelMe(name[0]);
			const user = client.data.user as UserDto;
			if (name[1] != "create a channel!") {
				client.leave(name[1]);
				if ((await this.DMChannelService.getDMChannelMeForText(name[1])) == 0) {
					const channel1 = await this.textChannelService.getChannelMe(name[1]);
					await this.textChannelService.removeUserFromChannel(channel1, user.id)//, channel.owner.id)
				}
			}
			for (let i = 0; channel.banned[i]; i++) {
				if (channel.banned[i].userId == user.id) {
						if (channel.banned[i].endOfBan <= new Date(Date.now())) 
							await this.textChannelService.unBanUser(channel, user, i);	
				}
			}
			const Majchannel = await this.textChannelService.getChannelMe(name[0]);				
			const baned = Majchannel.banned.find((banned) => banned.userId == user.id);
			if (baned) {
				const channel1 = await this.textChannelService.getChannelMe(name[1]);
				if ((await this.DMChannelService.getDMChannelMeForText(name[1])) == 0)
					await this.textChannelService.removeUserFromChannel(channel1, user.id)//, channel.owner.id)
				client.leave(name[1]);		
			}
			else {
				client.join(name[0]);
				await this.textChannelService.addUserToChannel(channel, user.id)//, channel.owner.id);
				let pass: string;
				if (channel.password === null)
					pass = '0';
				else
					pass = '1'
				if (channel.owner.username == user.username)
					client.emit('getChannelMeOne', channel.id, channel.name, channel.status, '1', pass);
				//le 1 si le client est le owner
				else
					client.emit('getChannelMeOne', channel.id, channel.name, channel.status, '0', pass);
			}
		} catch {}
	}

	@SubscribeMessage('channel')
	async getChannel(id: number): Promise<void> {
		try {
			const channel = await this.textChannelService.getChannel(id, [
				'users',
			]);
			
		} catch {}
	}

	@SubscribeMessage('channelMe')
  	async getChannelMe(@ConnectedSocket() client: Socket): Promise<void> {
    try {
		const user = client.data.user as UserDto;
		const channels = await this.textChannelService.getChannelsForUser(
        user.id,
      );
    } catch {}
  }

	@SubscribeMessage('deleteChannel')
	async deleteChannel(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const channel = await this.textChannelService.getChannelByName(name);
		await this.textChannelService.deleteChannel(channel.id, admin.id)
		const all_channels = await this.textChannelService.getAllChannels();
		const all = all_channels.map((chan) => { if (chan.status === true) { return { id: chan.id, name: chan.name, statue: "Public"}} else  { return { id: chan.id, name: chan.name, statue: "Private"}}});
		client.emit('deleteChannel', all);
		this.server.to(channel.name).emit('deleteChannelForAllUser', all)
		client.in(name).socketsLeave(name);
		this.server.emit("refreshChannel", all);
	}

	@SubscribeMessage('addUserToChannel')
	async addUserToChannel(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const userAdd = await this.userService.validateUser(args2[1]);
			const channel = await this.textChannelService.getChannelByName(args1[0]);
			await this.textChannelService.addUserToChannel(channel, userAdd.id);
		} catch {}
	}

	@SubscribeMessage('getAllChannels')
	async getAllChannels(@ConnectedSocket() client: Socket) {
		try {
			const all_channels = await this.textChannelService.getAllChannels();
			const all = all_channels.map((chan) => { if (chan.status === true) { return { id: chan.id, name: chan.name, statue: "Public"}} else  { return { id: chan.id, name: chan.name, statue: "Private"}}});
			client.emit('getAllChannels', all); 
		} catch {}
	}

	@SubscribeMessage('removeUserFromChannel')
	async removeUserFromChannel(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket() client: Socket) {
		try {
			const userAdd = await this.userService.validateUser(args2[1]);
			const channel = await this.textChannelService.getChannelByName(args1[0]);
			await this.textChannelService.removeUserFromChannel(channel, userAdd.id)
		} catch {}
	}

	@SubscribeMessage('addAdmin')
	async addAdmin(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const userAdd = await this.userService.validateUser(args2[1]);
		const channel = await this.textChannelService.getChannelByName(args1[0]);
		await this.textChannelService.addAdmin(channel, userAdd.id, admin.id)		
	}

	@SubscribeMessage('removeAdmin')
	async removeAdmin(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const userAdd = await this.userService.validateUser(args2[1]);
		const channel = await this.textChannelService.getChannelByName(args1[0]);
		await this.textChannelService.removeAdmin(channel, userAdd.id, admin.id)
	}

	@SubscribeMessage('changeStatue')
	async changeStatue(@MessageBody() args1: string, @MessageBody() args2: boolean, @ConnectedSocket()client: Socket) {
			const channel = await this.textChannelService.getChannelByName(args1[0]);
			await this.textChannelService.changeStatue(channel, args2[1]);
			const all_channels = await this.textChannelService.getAllChannels();
			const all = all_channels.map((chan) => { if (chan.status === true) { return { id: chan.id, name: chan.name, statue: "Public"}} else  { return { id: chan.id, name: chan.name, statue: "Private"}}});
			this.server.emit("refreshChannelStatus", all);
	}

	@SubscribeMessage('setPassword')
	async setPassword(@MessageBody() args: string, @ConnectedSocket() client: Socket) {
		try {
			const channel = await this.textChannelService.getChannelByName(args[0]);
			const ret = await this.textChannelService.setPassword(channel, args[1]) 
			if (ret === 1)	
				client.emit("emptyPassWord", channel.name);
		} catch {}

	}
	
	@SubscribeMessage('checkPass')
	async checkPass(@MessageBody() args: string, @ConnectedSocket()client: Socket) {
		try {
			const channel = await this.textChannelService.getChannelByName(args[0]);
			let passStatue: string;
				if (channel.status === false) {
					passStatue = await this.textChannelService.checkPassWord(channel, args[1]);
				}
				else
					passStatue = "ok";
				if (passStatue === "ko")
					client.leave(channel.name);
			client.emit("checkPass", channel.name, passStatue);
		} catch {}
	}

	@SubscribeMessage('changePass')
	async changePass(@MessageBody() args: string, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channel = await this.textChannelService.getChannelByName(args[0]);
			let ret: number;
			if (channel.owner.id === user.id) {
				ret = await this.textChannelService.changePass(channel, args[1], args[2]);
			}
			if (ret === 1)
				client.emit("changePass", "1");
			else
				client.emit("changePass", "0");
		} catch {}
	}

	@SubscribeMessage('muetUser')
	async muetUser(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket()client: Socket) {
		const channel = await this.textChannelService.getChannelByName(args1[0]);
		const admin = client.data.user as UserDto;
		const userMute = await this.userService.validateUser(args2[1]);
		const muted = channel.muted.find((muted) => muted.userId == args2[1]);
		if (!muted) 
			await this.textChannelService.muteUserInChannel(channel, admin, userMute);	
	}

	@SubscribeMessage('banUser')
	async banUser(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket()client: Socket) {
		const channel = await this.textChannelService.getChannelByName(args1[0]);
		const admin = client.data.user as UserDto;
		const userban = await this.userService.validateUser(args2[1]);
		const baned1 = channel.banned.find((banned) => banned.userId == args2[1]);
		if (!baned1) 
			await this.textChannelService.banUserInChannel(channel, admin, userban);
		const MajChannel = await this.textChannelService.getChannelByName(args1[0]);
		const baned = MajChannel.banned.find((banned) => banned.userId == args2[1]);
		if (baned) 
			this.server.to(channel.name).emit('banUser', channel.name);
	}

/*	@SubscribeMessage('bannedUser')
	async bannedUser(@MessageBody() chanName: string, @ConnectedSocket()client: Socket) {
		const channel = await this.textChannelService.getChannelByName(chanName);
		const user = client.data.user as UserDto;
		const baned = channel.banned.find((banned) => banned.userId == user.id);
		if (baned) {
			client.leave(channel.name);
		}
	}*/

	@SubscribeMessage('createDMChannel')
	async createDMChannel(@MessageBody() id: number, @MessageBody() name: string, @ConnectedSocket()client: Socket) {
		try {
			const user = client.data.user as UserDto;
			if (name[1] != "create a channel!")
				client.leave(name[1]);
			if ((await this.textChannelService.getChannelMeForDM(name[1])) == 1) {
				const channel1 = await this.textChannelService.getChannelMe(name[1]);
				await this.textChannelService.removeUserFromChannel(channel1, user.id);
			}
			const user2 = await this.userService.validateUser(id[0]);
			let channel: DMChannel;
			if (user.id < user2.id)
				channel = await this.DMChannelService.createDMChannel(user, user2);
			else
				channel = await this.DMChannelService.createDMChannel(user2, user);
		
			const all_channels = await this.DMChannelService.getDMChannelsForUser(
			user.id,
			);

			const all = all_channels.map((chan) => { if (chan.block1 === false && chan.block2 === false) { return { id: chan.id, name: chan.name, statue: "Unblocked"}} else if ((chan.block1 || chan.block2) === true) { return { id: chan.id, name: chan.name, statue: "Blocked"}}});
			client.emit('createDMChannel', all, channel.name);
			client.join(channel.name);
			this.server.emit('trans');
		} catch {}
	}
	
	@SubscribeMessage('refreshDMChannel')
	async refreshDMChannel(@ConnectedSocket()client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const all_channels = await this.DMChannelService.getDMChannelsForUser(
				user.id,
				);
			const all = all_channels.map((chan) => { 
				if (((chan.user1[0].id ===  user.id) && chan.block1 === false) || ((chan.user2[0].id ===  user.id) && chan.block2 === false)) { 
					return { id: chan.id, name: chan.name, statue: "Unblocked"}} 
				else if (((chan.user1[0].id ===  user.id) && chan.block1 === true) || ((chan.user2[0].id ===  user.id) && chan.block2 === true)) { 
					return { id: chan.id, name: chan.name, statue: "Blocked"}}});
			client.emit('refreshDMChannel', all)
		} catch {}
	}

	@SubscribeMessage('getDMChannelMe')
	async getDMChannelMe(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			if ((await this.textChannelService.getChannelMeForDM(name[1])) == 1) {
				const channel1 = await this.textChannelService.getChannelMe(name[1]);
				await this.textChannelService.removeUserFromChannel(channel1, user.id);
			}
			client.leave(name[1]);
			client.join(name[0]);
			const channel = await this.DMChannelService.getDMChannelMe(name[0]);
			if (channel.user1[0].id === user.id)
				client.emit('getDMChannelMe', channel.name, channel.block1)
			else
				client.emit('getDMChannelMe', channel.name, channel.block2)
		} catch {}
	}

	@SubscribeMessage('DMmessage')
	async DMmessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channel = await this.DMChannelService.getDMChannelMe(data[1]);
			if (data[2] == '0') {
				if ((channel.block1 || channel.block2) === false) {
					await this.DMChannelService.addMsgForDMChannel(data[0], data[1], user.id);
					this.server.to(channel.name).emit('message', data[0], user.username, user.id);
				}
				}
			else {
				const channel = await this.DMChannelService.getDMChannelMe(data[1]);		
				const all = channel.msgs.map((e) => {return  { message: e.message, username: e.username, uId: e.userId}})
				client.emit("messages", all);
			}
		} catch {}
	}

	@SubscribeMessage('DMBlock')
	async DMBlock(@MessageBody() name: string, @MessageBody() status: boolean, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channel = await this.DMChannelService.getDMChannelMe(name[0]);
			await this.DMChannelService.DMBlock(channel, user, status[1]);
			const channel1 = await this.DMChannelService.getDMChannelMe(name[0]);
			const all_channels = await this.DMChannelService.getDMChannelsForUser(
				user.id,
			);
			const all = all_channels.map((chan) => { 
				if (((chan.user1[0].id ===  user.id) && chan.block1 === false) || ((chan.user2[0].id ===  user.id) && chan.block2 === false)) { 
					return { id: chan.id, name: chan.name, statue: "Unblocked"}} 
				else if (((chan.user1[0].id ===  user.id) && chan.block1 === true) || ((chan.user2[0].id ===  user.id) && chan.block2 === true)) { 
					return { id: chan.id, name: chan.name, statue: "Blocked"}}});
			client.emit('refreshDMChannel', all)
		} catch {}
	}
}
