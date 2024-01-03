import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { UserDto } from "src/user/dtos/UserDto";
import { UserService } from "src/user/user.service";
import { TextChannelService } from './services/textChannel.service';
import { TextChannel } from "./entity/textChannel";
import { DMChannelService } from "./services/DMChannel.service";
import { DMChannel } from "./entity/dmChannel.entity";


@WebSocketGateway({
	// cors: {
	// 	origin: ['http://c1r15s5']
	// }
})

@WebSocketGateway({
	// cors: {
	// 	origin: ['http://c1r15s5']
	// }
})

export class ChatGateway {
	constructor(private readonly userService: UserService,
		private readonly textChannelService: TextChannelService,
		private readonly DMChannelService: DMChannelService) { }

	@WebSocketServer()
	server: Server;

	/*	@SubscribeMessage('message')
		handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
			this.server.emit('message', data, client.id)
		}*/
	async handleDisconnect(client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channels = await this.textChannelService.getChannelsForUser(user.id);
			const DMChannel = await this.DMChannelService.getDMChannelsForUser(user.id)
			if (channels) {
				for (let i = 0; channels[i]; i++) {
					await this.textChannelService.removeUserFromChannel(channels[i], user.id);
					const channel = await this.textChannelService.getChannelMe(channels[i].name);
					const userAllOut = channel.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
					client.leave(channel.name);
					this.server.to(channel.name).emit('setUserInChannel', userAllOut);
				}
			}
			if (DMChannel) {
				for (let i = 0; DMChannel[i]; i++)
					client.leave(DMChannel[i].name);
			}
		} catch { }
	}

	@SubscribeMessage('Typing')
	async Typing(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		if ((await this.DMChannelService.getDMChannelMeForText(data)) == 0) {
			const channel = await this.textChannelService.getChannelMe(data);
			const clientInRoom = await this.server.in(channel.name).allSockets();
			const muet = channel.muted.find((muted) => muted.userId == user.id)
			if (channel.users.find((user1) => user1.id == user.id)) {
				if (!muet) {
					const msg = user.username + " " + "est entrain d'écrire";
					for (let i = 0; channel.users[i]; i++) {
						if (channel.users[i].id !== user.id) {
							const Socket = await this.userService.getSocketUser(channel.users[i].id);
							if (Socket) {
								Socket.socket.forEach(socketId => {
									this.server.sockets.sockets.forEach(socket => {
										if (socket.id === socketId) {
											for (var elem of clientInRoom) {
												if (elem === socket.id)
													socket.emit('isTyping', msg);
											}
										}
									})
								})
							}
						}
					}
				}
			}
		}
		else {
			const channel = await this.DMChannelService.getDMChannelMe(data);
			const msg = user.username + " " + "est entrain d'écrire";
			let userId: number;
			if (channel.user1[0].id === user.id)
				userId = channel.user2[0].id;
			else
				userId = channel.user1[0].id;
			const clientInRoom = await this.server.in(channel.name).allSockets();
			for (let i = 0; channel.users[i]; i++) {
				if (channel.users[i].id !== user.id) {
					const Socket = await this.userService.getSocketUser(channel.users[i].id);
					if (Socket) {
						Socket.socket.forEach(socketId => {
							this.server.sockets.sockets.forEach(socket => {
								if (socket.id === socketId) {
									for (var elem of clientInRoom) {
										if (elem === socket.id)
											socket.emit('isTyping', msg);
									}
								}
							})
						})
					}
				}
			}
		}
	}

	@SubscribeMessage('message')
	async handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channel = await this.textChannelService.getChannelMe(data[1]);
			const clientInRoom = await this.server.in(channel.name).allSockets();
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
						for (let i = 0; channel.users[i]; i++) {
							const blocked = await this.userService.getUserBlocked(channel.users[i].id)
							let string_ret: string;
							const Socket = await this.userService.getSocketUser(channel.users[i].id);
							if (Socket) {
								Socket.socket.forEach(socketId => {
									this.server.sockets.sockets.forEach(socket => {
										if (socket.id === socketId) {
											if (blocked) {
												if (blocked.find((users) => users == user.id)) {
													string_ret = ("you blocked " + user.username);
												}
												else
													string_ret = data[0];
											}
											else
												string_ret = data[0];
											for (var elem of clientInRoom) {
												if (elem === socket.id)
													socket.emit('message', string_ret, user.username, user.id);
											}
										}
									})
								})
							}
						}
						//this.server.to(channel.name).emit('message', data[0], user.username, user.id);
					}
				}
				else {
					const channel = await this.textChannelService.getChannelMe(data[1]);
					const blocked = await this.userService.getUserBlocked(user.id)
					let all: { message: string; username: string; uId: number; }[];
					if (blocked)
						all = channel.msgs.map((e) => { if (blocked.find((user) => user == e.userId)) { return { message: ("you blocked " + e.username), username: e.username, uId: e.userId } } else { return { message: e.message, username: e.username, uId: e.userId } } });
					else
						all = channel.msgs.map((e) => { return { message: e.message, username: e.username, uId: e.userId } });
					client.emit("messages", all);
				}
			}
		} catch { }
	}

	@SubscribeMessage('createchannel')
	async createchannel(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		try {
			if (name[1] != "create a channel!")
				client.leave(name[1]);

			client.join(name[0]);
			const user = client.data.user as UserDto;
			await this.textChannelService.createChannel(name[0], user.id, name[2]);
			const channel = await this.textChannelService.getChannelMe(name[0]);
			const all_channels = await this.textChannelService.getAllChannels();

			const all = all_channels.map((chan) => { if (chan.status === true) { return { id: chan.id, name: chan.name, statue: "Public" } } else { return { id: chan.id, name: chan.name, statue: "Private" } } });
			client.emit('createchannel', all, channel.name);
			this.server.emit("refreshChannel", all);
		} catch { }
	}

	@SubscribeMessage('getChannelMeOne')
	async getChannelMeOne(client: Socket, name: string): Promise<void> {
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
				let userStatus: string;
				const channel1 = await this.textChannelService.getChannelMe(name[0]);
				const userAll = channel1.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
				if (channel.password === null)
					pass = '0';
				else
					pass = '1'
				if ((channel.adminId.find((user1) => user1.id == user.id)) && (user.id != channel.owner.id))
					userStatus = '2';
				else if (channel.owner.id == user.id)
					userStatus = '1';
				else
					userStatus = '0';
				client.emit('getChannelMeOne', channel.id, channel.name, channel.status, userStatus, pass, userAll);
				if ((await this.DMChannelService.getDMChannelMeForText(name[1])) == 0) {
					if (name[1] != "create a channel!") {
						const channelOut = await this.textChannelService.getChannelMe(name[1]);
						const userAllOut = channelOut.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
						this.server.to(channelOut.name).emit('setUserInChannel', userAllOut);
					}
					else {
						const channelOut = await this.textChannelService.getChannelMe(name[0]);
						const userAllOut = channelOut.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
						this.server.to(channelOut.name).emit('setUserInChannel', userAllOut);
					}
				}
				this.server.to(channel.name).emit('setUserInChannel', userAll);
			}
		} catch { }
	}

	@SubscribeMessage('checkLogRoom')
	async checkRoom(@ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channels = await this.textChannelService.getChannelsForUser(user.id);
			const DMChannel = await this.DMChannelService.getDMChannelsForUser(user.id)
			for (let i = 0; channels[i]; i++) {
				client.leave(channels[i].name);
			}
			for (let i = 0; DMChannel[i]; i++) {
				client.leave(DMChannel[i].name);
			}
		} catch { }
	}

	@SubscribeMessage('leaveChat')
	async leaveChat(@ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channels = await this.textChannelService.getChannelsForUser(user.id);
			const DMChannel = await this.DMChannelService.getDMChannelsForUser(user.id)
			if (channels) {
				for (let i = 0; channels[i]; i++) {
					await this.textChannelService.removeUserFromChannel(channels[i], user.id);
					const channel = await this.textChannelService.getChannelMe(channels[i].name);
					const userAllOut = channel.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
					client.leave(channel.name);
					this.server.to(channel.name).emit('setUserInChannel', userAllOut);
				}
			}
			if (DMChannel) {
				for (let i = 0; DMChannel[i]; i++)
					client.leave(DMChannel[i].name);
			}
		} catch { }
	}

	@SubscribeMessage('channel')
	async getChannel(id: number): Promise<void> {
		try {
			const channel = await this.textChannelService.getChannel(id, [
				'users',
			]);

		} catch { }
	}

	@SubscribeMessage('channelMe')
	async getChannelMe(@ConnectedSocket() client: Socket): Promise<void> {
		try {
			const user = client.data.user as UserDto;
			const channels = await this.textChannelService.getChannelsForUser(
				user.id,
			);
		} catch { }
	}

	@SubscribeMessage('deleteChannel')
	async deleteChannel(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		const user = client.data.user as UserDto;
		const admin = await this.userService.validateUser(user.id);
		const channel = await this.textChannelService.getChannelByName(name);
		await this.textChannelService.deleteChannel(channel.id, admin.id)
		const all_channels = await this.textChannelService.getAllChannels();
		const all = all_channels.map((chan) => { if (chan.status === true) { return { id: chan.id, name: chan.name, statue: "Public" } } else { return { id: chan.id, name: chan.name, statue: "Private" } } });
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
		} catch { }
	}

	@SubscribeMessage('getAllChannels')
	async getAllChannels(@ConnectedSocket() client: Socket) {
		try {
			const all_channels = await this.textChannelService.getAllChannels();
			const all = all_channels.map((chan) => { if (chan.status === true) { return { id: chan.id, name: chan.name, statue: "Public" } } else { return { id: chan.id, name: chan.name, statue: "Private" } } });
			client.emit('getAllChannels', all);
		} catch { }
	}

	@SubscribeMessage('removeUserFromChannel')
	async removeUserFromChannel(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket() client: Socket) {
		try {
			const userAdd = await this.userService.validateUser(args2[1]);
			const channel = await this.textChannelService.getChannelByName(args1[0]);
			await this.textChannelService.removeUserFromChannel(channel, userAdd.id)
		} catch { }
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
	async changeStatue(@MessageBody() args1: string, @MessageBody() args2: boolean, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channel = await this.textChannelService.getChannelByName(args1[0]);
			if (channel.owner.id === user.id) {
				await this.textChannelService.changeStatue(channel, args2[1]);
				const all_channels = await this.textChannelService.getAllChannels();
				const all = all_channels.map((chan) => { if (chan.status === true) { return { id: chan.id, name: chan.name, statue: "Public" } } else { return { id: chan.id, name: chan.name, statue: "Private" } } });
				this.server.emit("refreshChannelStatus", all);
			}
		} catch { }
	}

	/*@SubscribeMessage('setPassword')
	async setPassword(@MessageBody() args: string, @ConnectedSocket() client: Socket) {
		try {
			const channel = await this.textChannelService.getChannelByName(args[0]);
			const ret = await this.textChannelService.setPassword(channel, args[1]) 
			if (ret === 1)	
				client.emit("emptyPassWord", channel.name);
		} catch {}

	}*/

	@SubscribeMessage('checkPass')
	async checkPass(@MessageBody() args: string, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channel = await this.textChannelService.getChannelByName(args[0]);
			let oldChannel: TextChannel;
			if (args[2] !== "create a channel!") {
				if ((await this.DMChannelService.getDMChannelMeForText(args[2])) == 0)
					oldChannel = await this.textChannelService.getChannelByName(args[2]);
			}
			let passStatue: string;
			if (channel.status === false) {
				passStatue = await this.textChannelService.checkPassWord(channel, args[1]);
			}
			else
				passStatue = "ok";
			if (passStatue === "ko" && args[2] !== "create a channel!") {
				client.leave(args[2]);
				if ((await this.DMChannelService.getDMChannelMeForText(args[2])) == 0)
					await this.textChannelService.removeUserFromChannel(oldChannel, user.id)
			}
			const channelOut = await this.textChannelService.getChannelMe(args[0]);
			const userAllOut = channelOut.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
			let oldChannelOut: TextChannel
			let userAllOut2: { id: number; username: string; avatar: string; }[]
			if (args[2] !== "create a channel!") {
				if ((await this.DMChannelService.getDMChannelMeForText(args[2])) == 0) {
					oldChannelOut = await this.textChannelService.getChannelMe(args[2]);
					userAllOut2 = oldChannelOut.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
				}
			}
			client.emit("checkPass", channel.name, passStatue, args[2]);//, userAllOut);
			if (passStatue === "ko") {
				if ((await this.DMChannelService.getDMChannelMeForText(args[2])) == 0) {
					this.server.to(oldChannel.name).emit('setUserInChannel', userAllOut2);
					this.server.to(channel.name).emit('setUserInChannel', userAllOut);
				}

			}
		} catch { }
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
		} catch { }
	}

	@SubscribeMessage('muetUser')
	async muetUser(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket() client: Socket) {
		const channel = await this.textChannelService.getChannelByName(args1[0]);
		const admin = client.data.user as UserDto;
		const userMute = await this.userService.validateUser(args2[1]);
		const muted = channel.muted.find((muted) => muted.userId == args2[1]);
		if (!muted)
			await this.textChannelService.muteUserInChannel(channel, admin, userMute, args2[2]);
	}

	@SubscribeMessage('banUser')
	async banUser(@MessageBody() args1: string, @MessageBody() args2: number, @ConnectedSocket() client: Socket) {
		const channel = await this.textChannelService.getChannelByName(args1[0]);
		const admin = client.data.user as UserDto;
		const userban = await this.userService.validateUser(args2[1]);
		const baned1 = channel.banned.find((banned) => banned.userId == args2[1]);
		if (!baned1)
			await this.textChannelService.banUserInChannel(channel, admin, userban, args2[2]);
		const MajChannel = await this.textChannelService.getChannelByName(args1[0]);
		const baned = MajChannel.banned.find((banned) => banned.userId == args2[1]);
		if (baned) {
			client.leave(channel.name)
			await this.textChannelService.removeUserFromChannel(channel, userban.id)
			const channelOut = await this.textChannelService.getChannelByName(args1[0]);
			const userAllOut = channelOut.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
			this.server.to(channelOut.name).emit('setUserInChannel', userAllOut);
			const Socket = await this.userService.getSocketUser(userban.id);
			if (Socket) {
				Socket.socket.forEach(socketId => {
					this.server.sockets.sockets.forEach(socket => {
						if (socket.id === socketId) {
							socket.emit('banUser', channel.name);
						}
					})
				})
			}
		}
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
	async createDMChannel(@MessageBody() id: number, @MessageBody() name: string, @ConnectedSocket() client: Socket) {
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

			const blocked = await this.userService.getUserBlocked(user.id);

			if (blocked) {
				if (blocked.find((users) => users == user2.id))
					await this.DMChannelService.DMBlock(channel, user, true);
			}

			const all_channels = await this.DMChannelService.getDMChannelsForUser(
				user.id,
			);

			const all = all_channels.map((chan) => { 
			if (chan.block1 === false && chan.block2 === false) { 
				const cleanUser1 = (({ id, username }) => ({ id, username }))(chan.users[0]);
				const cleanUser2 = (({ id, username }) => ({ id, username }))(chan.users[1]);
				return { id: chan.id, name: chan.name, statue: "Unblocked", user: [cleanUser1, cleanUser2] } } 
			else if ((chan.block1 || chan.block2) === true) { 
				const cleanUser1 = (({ id, username }) => ({ id, username }))(chan.users[0]);
				const cleanUser2 = (({ id, username }) => ({ id, username }))(chan.users[1]);
				return { id: chan.id, name: chan.name, statue: "Blocked", user: [cleanUser1, cleanUser2] } } });
			if (user.id < user2.id)
				client.emit('createDMChannel', all, channel.name, channel.user2[0].username);
			else
				client.emit('createDMChannel', all, channel.name, channel.user1[0].username);
			client.join(channel.name);
			this.server.emit('trans');
		} catch { }
	}

	@SubscribeMessage('refreshDMChannel')
	async refreshDMChannel(@ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const all_channels1 = await this.DMChannelService.getDMChannelsForUser(
				user.id,
			);
			const blocked = await this.userService.getUserBlocked(user.id);
			for (let i = 0; all_channels1[i]; i++) {
				await this.DMChannelService.findDMBlock(all_channels1[i], user, blocked)
			}
			const all_channels = await this.DMChannelService.getDMChannelsForUser(
				user.id,
			);
			const all = all_channels.map((chan) => {
				if (((chan.user1[0].id === user.id) && chan.block1 === false) || ((chan.user2[0].id === user.id) && chan.block2 === false)) {
					const cleanUser1 = (({ id, username }) => ({ id, username }))(chan.users[0]);
					const cleanUser2 = (({ id, username }) => ({ id, username }))(chan.users[1]);
					return { id: chan.id, name: chan.name, statue: "Unblocked", user:[cleanUser1, cleanUser2] }
				}
				else if (((chan.user1[0].id === user.id) && chan.block1 === true) || ((chan.user2[0].id === user.id) && chan.block2 === true)) {
					const cleanUser1 = (({ id, username }) => ({ id, username }))(chan.users[0]);
					const cleanUser2 = (({ id, username }) => ({ id, username }))(chan.users[1]);
					return { id: chan.id, name: chan.name, statue: "Blocked", user: [cleanUser1, cleanUser2]}
				}
			});
			client.emit('refreshDMChannel', all)
		} catch { }
	}

	@SubscribeMessage('getDMChannelMe')
	async getDMChannelMe(@MessageBody() name: string, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			if ((await this.textChannelService.getChannelMeForDM(name[1])) == 1) {
				const channel1 = await this.textChannelService.getChannelMe(name[1]);
				await this.textChannelService.removeUserFromChannel(channel1, user.id);
				const channelOut = await this.textChannelService.getChannelMe(name[1]);
				const userAllOut = channelOut.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
				this.server.to(channelOut.name).emit('setUserInChannel', userAllOut);
			}
			client.leave(name[1]);
			client.join(name[0]);
			const channel1 = await this.DMChannelService.getDMChannelMe(name[0]);
			const blocked = await this.userService.getUserBlocked(user.id);
			await this.DMChannelService.findDMBlock(channel1, user, blocked)
			const channel = await this.DMChannelService.getDMChannelMe(name[0]);
			const userAll = channel.users.map((chan) => { return { id: chan.id, username: chan.username, avatar: chan.avatar } });
			if (channel.user1[0].id === user.id)
				client.emit('getDMChannelMe', channel.name, channel.block1, userAll, channel.user2[0].username);
			else
				client.emit('getDMChannelMe', channel.name, channel.block2, userAll, channel.user1[0].username);
		} catch { }
	}

	@SubscribeMessage('DMmessage')
	async DMmessage(@MessageBody() data: string, @ConnectedSocket() client: Socket) {
		try {
			const user = client.data.user as UserDto;
			const channel = await this.DMChannelService.getDMChannelMe(data[1]);
			let userId: number;
			if (channel.user1[0].id === user.id)
				userId = channel.user2[0].id;
			else
				userId = channel.user1[0].id;
			const clientInRoom = await this.server.in(channel.name).allSockets()
			if (data[2] === '0') {
				await this.DMChannelService.addMsgForDMChannel(data[0], data[1], user.id);
				for (let i = 0; channel.users[i]; i++) {
					const blocked = await this.userService.getUserBlocked(channel.users[i].id)
					let string_ret: string;
					const Socket = await this.userService.getSocketUser(channel.users[i].id);
					if (Socket) {
						Socket.socket.forEach(socketId => {
							this.server.sockets.sockets.forEach(socket => {
								if (socket.id === socketId) {
									if (blocked) {
										if (blocked.find((users) => users == user.id)) {
											string_ret = ("you blocked " + user.username);
										}
										else
											string_ret = data[0];
									}
									else
										string_ret = data[0];
									for (var elem of clientInRoom) {
										if (elem === socket.id)
											socket.emit('message', string_ret, user.username, user.id);
									}
								}
							})
						})
					}
				}
				/*await this.DMChannelService.addMsgForDMChannel(data[0], data[1], user.id);
				let string_ret: string;
				//	const clientInRoom = await this.server.in(channel.name).allSockets()
				//	if (clientInRoom.size === 1)

				//const mapBlock = blocked.map((bloc) => { if (bloc === user.id) { return {id: bloc}}})
				//if (blocked.find((userI) => userI == user.id)) {
				//if (mapBlock) {
				//	let rep = 0;
				//	for (let i = 0; blocked[i]; i++) {
				///		if (blocked[i] === user.id)
				//		rep = 1;
				//	}
				const blocked = await this.userService.getUserBlockedOn(userId, user.id);//, userId]; //userId celui qui recoit le message, user celui qui envoie donc a verifier si il est blocker
				if (blocked === 1) {
					string_ret = ("you blocked " + user.username);
					//	client.emit('message', data[0], user.username, user.id);
					const clientInRoom = await this.server.in(channel.name).allSockets();
					if (clientInRoom.size !== 1) {
						client.emit('message', data[0], user.username, user.id);
						const Socket = await this.userService.getSocketUser(userId);
						if (Socket) {
							Socket.socket.forEach(socketId => {
								this.server.sockets.sockets.forEach(socket => {
									if (socket.id === socketId) {
										for(var elem of clientInRoom) {
											if (elem === socket.id)
												socket.emit('message', string_ret, user.username, user.id);
										}
									}
								})
							})
						}
					}
					else
						this.server.to(channel.name).emit('message', data[0], user.username, user.id);
				}
				else
					this.server.to(channel.name).emit('message', data[0], user.username, user.id);*/
			}
			else {
				const blocked = await this.userService.getUserBlockedOn(user.id, userId);
				const channel = await this.DMChannelService.getDMChannelMe(data[1]);
				let all: { message: string; username: string; uId: number; }[];
				if (blocked === 1) {
					const user2 = await this.userService.validateUser(userId)
					all = channel.msgs.map((e) => { if (e.userId === userId) { return { message: ("you blocked " + user2.username), username: e.username, uId: e.userId } } else { return { message: e.message, username: e.username, uId: e.userId } } })
				}
				else
					all = channel.msgs.map((e) => { return { message: e.message, username: e.username, uId: e.userId } })
				client.emit("messages", all);
			}
		} catch { }
	}

	/*	@SubscribeMessage('DMBlock')
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
					if (((chan.user1[0].id === user.id) && chan.block1 === false) || ((chan.user2[0].id === user.id) && chan.block2 === false)) {
						return { id: chan.id, name: chan.name, statue: "Unblocked" }
					}
					else if (((chan.user1[0].id === user.id) && chan.block1 === true) || ((chan.user2[0].id === user.id) && chan.block2 === true)) {
						return { id: chan.id, name: chan.name, statue: "Blocked" }
					}
				});
				client.emit('refreshDMChannel', all)
			} catch { }
		}*/
}