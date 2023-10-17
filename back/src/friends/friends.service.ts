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
		let check = await this.friendsRepository.find({ where: [{ first_User: user, second_User: friendUser }, { first_User: friendUser, second_User: user }] })
		if (check[0]) {
			console.log(check[0])
			return "demande d'ami déjà envoyé"
		}
		const friends = new Friends()
		friends.first_User = user;
		friends.second_User = friendUser;
		await this.friendsRepository.save(friends);
		return "demande d'ami envoyé"
	}

	async getFriends(user: User) {
		return await this.friendsRepository.find({ where: [{ first_User: user }, { second_User: user }] })
	}
}
