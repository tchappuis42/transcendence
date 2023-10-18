import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PrimaryColumn, Repository } from 'typeorm';
import { Friends } from './friends.entity';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

@Injectable()
export class FriendsService {

	constructor(
		@InjectRepository(Friends) private friendsRepository: Repository<Friends>, private readonly userservice: UserService) { }

	async addFriend(user: User, friend: string) {
		const friendUser = await this.userservice.validateUserByName(friend);
		const check = await this.friendsRepository.findOne({ where: [{ first_User: user, second_User: friendUser }, { first_User: friendUser, second_User: user }] })
		if (check)
			return "demande d'ami déjà envoyé"
		const friends = new Friends()
		friends.first_User = user;
		friends.second_User = friendUser;
		await this.friendsRepository.save(friends);
		return "demande d'ami envoyé"
	}

	async getFriends(user: User) {
		return await this.friendsRepository.find({ where: [{ first_User: user }, { second_User: user }] })
	}

	async acceptFriend(user: User, friend: string) {
		const friendUser = await this.userservice.validateUserByName(friend);
		const check = await this.friendsRepository.findOne({ where: [{ first_User: user, second_User: friendUser }, { first_User: friendUser, second_User: user }] })
		if (check && check.friend_status === false) {
			await this.friendsRepository.update(check.id, { friend_status: true })
			return "ami ajouté";
		}
		return "erreur";
	}

	async removeFriend(user: User, friend: string) {
		const friendUser = await this.userservice.validateUserByName(friend);
		const check = await this.friendsRepository.findOne({ where: [{ first_User: user, second_User: friendUser }, { first_User: friendUser, second_User: user }] })
		if (check) {
			await this.friendsRepository.delete(check.id)
			return "ami suprimé";
		}
		return "erreur";
	}
}
