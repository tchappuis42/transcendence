import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrimaryColumn, Repository } from 'typeorm';
import { Friends } from './friends.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';
import { AcceptDTO } from './dtos/AcceptDto';

@Injectable()
export class FriendsService {

	constructor(
		@InjectRepository(Friends) private friendsRepository: Repository<Friends>, private readonly userservice: UserService) { }
	async addFriend(user: User, friend: number) {
		const friendUser = await this.userservice.validateUser(friend);
		const check = await this.friendsRepository.findOne({ where: [{ first_User: user, second_User: friendUser }, { first_User: friendUser, second_User: user }] })
		//console.log("check = ", check)
		if (check)
			return "demande d'ami déjà envoyé"
		const friends = new Friends()
		friends.first_User = user;
		friends.second_User = friendUser;
		await this.friendsRepository.save(friends);
		return "demande d'ami envoyé"
	}

	async getFriends(user: User) {
		const list = await this.friendsRepository.find({ where: [{ first_User: user }, { second_User: user }] })
		if (!list)
			throw new NotFoundException("user not found") // bonne erreur
		console.log("liste = ", list)
		const friends = list.map((friend) => {
			if (friend.first_User.id === user.id) {
				if (friend.friend_status === true)
					return { id: friend.second_User.id, username: friend.second_User.username, status: friend.second_User.connected, friend_status: 0 }
				return { id: friend.second_User.id, username: friend.second_User.username, status: friend.second_User.connected, friend_status: 2 }
			}
			else {
				if (friend.friend_status === true)
					return { id: friend.first_User.id, username: friend.first_User.username, status: friend.first_User.connected, friend_status: 0 }
				return { id: friend.first_User.id, username: friend.first_User.username, status: friend.first_User.connected, friend_status: 1 }
			}
		});
		return friends;
	}

	async acceptFriend(user: User, friend: number) {
		const friendUser = await this.userservice.validateUser(friend);
		const check = await this.friendsRepository.findOne({ where: [{ first_User: user, second_User: friendUser }, { first_User: friendUser, second_User: user }] })
		if (check && check.friend_status === false) {
			await this.friendsRepository.update(check.id, { friend_status: true })
			return "ami ajouté";
		}
		return "erreur";
	}

	async refuseFriend(user: User, friend: number) {
		const friendUser = await this.userservice.validateUser(friend);
		const check = await this.friendsRepository.findOne({ where: [{ first_User: user, second_User: friendUser }, { first_User: friendUser, second_User: user }] })
		if (check && check.friend_status === false) {
			await this.friendsRepository.delete(check.id)
			return "demande d'ami refuser";
		}
		return "erreur";
	}

	async removeFriend(user: User, friend: number) {
		const friendUser = await this.userservice.validateUser(friend);
		const check = await this.friendsRepository.findOne({ where: [{ first_User: user, second_User: friendUser }, { first_User: friendUser, second_User: user }] })
		if (check) {
			await this.friendsRepository.delete(check.id)
			return "ami suprimé";
		}
		return "erreur";
	}
}
