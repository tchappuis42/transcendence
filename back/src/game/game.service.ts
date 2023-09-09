import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserDto } from 'src/user/dtos/UserDto';
import { CreatGameDTO } from './dtos/creatGame.dto';

interface roomName {
	name: string;
	player1: string;
	player2: string;
}

@Injectable()
export class GameService {
	waitingGame: Socket;
	room: roomName;

	matchmaking(user: UserDto, client: Socket): void | CreatGameDTO {
		if (this.waitingGame && this.waitingGame !== client) {
			let element: roomName = {
				name: user.username,
				player1: client.id,
				player2: this.waitingGame.id,
			}
			this.room = element;
			client.join(this.room.name);
			this.waitingGame.join(this.room.name);

			const data: CreatGameDTO = {
				roomName: this.room.name,
				player1: client.data.user,
				player2: this.waitingGame.data.user
			}
			console.log(this.room)
			return data;
		}
		else if (this.waitingGame === client) {
			console.log("la")
			this.waitingGame = null;
		}
		else {
			console.log("lo")
			this.waitingGame = client;
			console.log("waiting =", this.waitingGame.id)
			return;
		}
	}

	gamelife() {
		return this.room.name;
	}
}
