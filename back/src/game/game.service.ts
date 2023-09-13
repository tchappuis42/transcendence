import { Injectable, Logger } from '@nestjs/common';
import { Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserDto } from 'src/user/dtos/UserDto';
import { CreatGameDTO } from './dtos/creatGame.dto';
import { IoAdapter } from '@nestjs/platform-socket.io';

interface roomName {
	name: string;
	socket1: Socket;
	socket2: Socket
}

@Injectable()
export class GameService {
	waitingGame: Socket;
	room: roomName;

	matchmaking(user: UserDto, client: Socket): string | CreatGameDTO {
		//check si le joueur et deja en game ---> retourner un message "vous etes deja en game" todo attendre le systeme de status
		//check si le joueur et deja en machtmaking ---> retourner un message "vous etes deja en recheche de partie"
		//check si y'a un joueur en matchmaking ---> oui creer la game, non mettre le joueur en matchmaking, et si la socket et la meme sortie de la recheche de game
		if (this.waitingGame) {
			if (this.waitingGame === client) {
				this.waitingGame = null;
				return "fin de la recherche de partie";
			}
			if (client.data.user.id === this.waitingGame.data.user.id)
				return "vous etes deja en rechecher de partie"
			let element: roomName = {
				name: user.username,
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
			return data;
		}
		else {
			this.waitingGame = client;
			return "recherche de partie";
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
