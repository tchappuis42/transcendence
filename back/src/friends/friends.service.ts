import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrimaryColumn, Repository } from 'typeorm';
import { Friends } from './friends.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ConnctionState } from 'src/user/dtos/ConnectionStateEnum';
import { FriendDto } from './dtos/FriendDto';
import { first } from 'rxjs';
import { UserDto } from 'src/user/dtos/UserDto';

@Injectable()
@WebSocketGateway()
export class FriendsService {

	@WebSocketServer() server: Server;

	constructor(
		@InjectRepository(Friends) private friendsRepository: Repository<Friends>, private readonly userservice: UserService) { }

	async addFriend(user: User, friend: number) {
		const blocked = user.blockedId.find(id => id == friend) // 2 = pourquoi je coompar 2 number
		if (blocked)
			return "impossible d'ajouter un user bloqué"

		const friendUser = await this.userservice.validateUser(friend);
		const blockMe = friendUser.blockedId.find(id => id == user.id);
		const check = await this.friendsRepository.findOne({ where: [{ first_id: user.id, second_id: friendUser.id }, { first_id: friendUser.id, second_id: user.id }] })
		if (check)
			return "demande d'ami déjà envoyé"
		const friends = new Friends()
		friends.first_id = user.id;
		friends.first_User = user;
		friends.second_id = friendUser.id;
		friends.second_User = friendUser; //
		await this.friendsRepository.save(friends);
		if (friendUser.status !== ConnctionState.Offline && !blockMe)
			await this.sendFriendMessage(friends.second_id, friends.first_User, "friendRequest")
		return "demande d'ami envoyé"
	}

	async getFriends(user: User) {
		const list = await this.friendsRepository.find({ where: [{ first_id: user.id }, { second_id: user.id }] })
		if (!list)
			throw new NotFoundException("user not found") // bonne erreur
		const friends = list.map((friend) => {
			if (friend.first_User.id === user.id) {
				if (friend.friend_status === true)
					return { friend_user: friend.second_User, friend_status: 0 }
				return { friend_user: friend.second_User, friend_status: 2 }
			}
			else {
				if (friend.friend_status === true)
					return { friend_user: friend.first_User, friend_status: 0 }
				return { friend_user: friend.first_User, friend_status: 1 }
			}
		});
		const filteredFriends = friends.filter(friend => !user.blockedId.some(id => friend.friend_user.id == id)).map(user => {
			const { password, twoFaSecret, identifiant, socket, blockedId, ...p } = user.friend_user;
			return { ...user, friend_user: p };
		});

		return filteredFriends;
	}

	getdata(relationship: Friends, user: User) {
		if (relationship.first_id === user.id) {
			const data: { user: User, friend: User } = {
				user: relationship.first_User,
				friend: relationship.second_User
			};
			return data
		}
		else {
			const data: { user: User, friend: User } = {
				user: relationship.second_User,
				friend: relationship.first_User
			};
			return data
		}
	}

	async acceptFriend(user: User, friend: number) {
		const friendUser = await this.userservice.validateUser(friend);
		const relationship = await this.friendsRepository.findOne({ where: [{ first_id: user.id, second_id: friendUser.id }, { first_id: friendUser.id, second_id: user.id }] })
		if (relationship && relationship.friend_status === false) {
			const data = this.getdata(relationship, user)
			await this.friendsRepository.update(relationship.id, { friend_status: true })
			if (friendUser.status !== ConnctionState.Offline)
				await this.sendFriendMessage(friend, data.user, "friend")
			await this.sendFriendMessage(user.id, data.friend, "friend")
			return "ami ajouté";
		}
		return "erreur";
	}

	async refuseFriend(user: User, friend: number) {
		const friendUser = await this.userservice.validateUser(friend);
		const relationship = await this.friendsRepository.findOne({ where: [{ first_id: user.id, second_id: friendUser.id }, { first_id: friendUser.id, second_id: user.id }] })
		if (relationship && relationship.friend_status === false) {
			await this.friendsRepository.delete(relationship.id)
			return "demande d'ami refuser";
		}
		return "erreur";
	}

	async removeFriend(user: User, friend: number) {
		const friendUser = await this.userservice.validateUser(friend);
		const relationship = await this.friendsRepository.findOne({ where: [{ first_id: user.id, second_id: friendUser.id }, { first_id: friendUser.id, second_id: user.id }] })
		if (relationship) {
			await this.friendsRepository.delete(relationship.id)
			const data = this.getdata(relationship, user)
			if (friendUser.status !== ConnctionState.Offline)
				await this.sendFriendMessage(friend, data.user, "friend")
			await this.sendFriendMessage(user.id, data.friend, "friend")
			return "ami suprimé";
		}
		return "erreur";
	}

	async sendFriendMessage(send_id: number, user: User, event: string) {
		const Socket = await this.userservice.getSocketUser(send_id);
		const data: FriendDto = {
			friend_user: user,
			friend_status: 1,
		}
		const { password, socket, twoFaSecret, blockedId, identifiant, ...newdata } = data.friend_user;
		if (Socket) {
			Socket.socket.forEach(socketId => {
				this.server.sockets.sockets.forEach(socket => {
					if (socket.id === socketId) {
						socket.emit(event, newdata)
					}
				})
			})
		}
	}

	async getFriendParId(user: User, friendId: number) {
		const friend = await this.friendsRepository.findOne({ where: [{ first_id: user.id, second_id: friendId }, { first_id: friendId, second_id: user.id }] })
		if (friend) {
			if (friend.first_User.id === user.id) {
				if (friend.friend_status === true)
					return { friend_user: friend.second_User, friend_status: 0 }
				return { friend_user: friend.second_User, friend_status: 2 }
			}
			else {
				if (friend.friend_status === true)
					return { friend_user: friend.first_User, friend_status: 0 }
				return { friend_user: friend.first_User, friend_status: 1 }
			}
		}
	}
}
