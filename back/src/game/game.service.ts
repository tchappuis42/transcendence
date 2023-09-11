import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserDto } from 'src/user/dtos/UserDto';
import { CreatGameDTO } from './dtos/creatGame.dto';
import { IoAdapter } from '@nestjs/platform-socket.io';

interface roomName {
	name: string;
	player1: string;
	player2: string;
	socket1: Socket;
	socket2: Socket
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
				socket1: client,
				socket2: this.waitingGame
			}
			this.room = element;
			client.join(this.room.name);
			this.waitingGame.join(this.room.name);

			const data: CreatGameDTO = {
				roomName: this.room.name,
				player1: client.data.user,
				player2: this.waitingGame.data.user
			}
			this.waitingGame = null;
			//	console.log(this.room)
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
		if (this.room)
			return this.room.name;
	}

	clean() {
		if (this.room) {
			console.log(this.room);
			this.room.socket1.leave(this.room.name)
			this.room.socket2.leave(this.room.name)
			this.room = null
		}
	}

	cleanMM(client: Socket) {
		console.log("sa clean")
		if (client === this.waitingGame)
			this.waitingGame = null;
	}
}
