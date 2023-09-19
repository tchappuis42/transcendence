import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserDto } from 'src/user/dtos/UserDto';
import { CreatGameDTO } from './dtos/creatGame.dto';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { UserService } from 'src/user/user.service';
import { Paddle } from './pong/paddle';
import { Pong } from './pong/pong';

interface roomName {
	name: string;
	socket1: Socket;
	socket2: Socket
	pong: Pong;
}

@Injectable()
export class GameService {
	constructor(private readonly userservice: UserService) { }

	waitingGame: Socket;
	rooms: roomName[] = []; //tableau de room

	matchmaking(user: UserDto, client: Socket, server: Server): string | CreatGameDTO {
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
				socket2: this.waitingGame,
				pong: new Pong()
			}
			this.rooms.push(element);
			client.join(element.name);
			this.waitingGame.join(element.name);

			const data: CreatGameDTO = {
				roomName: element.name,
				player1: element.socket1.data.user,
				player2: element.socket2.data.user
			}
			this.waitingGame = null;
			this.life(server, client);
			return data;
		}
		else {
			this.waitingGame = client;
			return "recherche de partie";
		}
	}

	findRoom(client: Socket) {
		console.log("rooms = ", this.rooms)
		let room = this.rooms.find(room => room.socket1 === client)
		if (room)
			return room;

		let room2 = this.rooms.find(room => room.socket2 === client)
		if (room2)
			return room2;
	}

	clean(client: Socket) {
		const room = this.findRoom(client)
		if (room) {
			room.socket1.leave(room.name)
			room.socket2.leave(room.name)
			this.rooms = this.rooms.filter((r) => r.name !== room.name)
		}
	}

	cleanMM(client: Socket) {
		if (client === this.waitingGame)
			this.waitingGame = null;
	}

	paddle(client: Socket, data: string) {
		const room = this.findRoom(client)
		let player: Paddle | null = null;
		if (client === room.socket1)
			player = room.pong.getPlayer1();
		if (client === room.socket2)
			player = room.pong.getPlayer2();

		if (player) {
			console.log(player)
			if (data === 'up') {
				player.moveUp();
			} else if (data === 'down') {
				player.moveDown();
			}
			console.log("y = ", player.y)
		}
	}

	life(server: Server, client: Socket) {
		const room = this.findRoom(client)
		if (room) {
			setInterval(() => {
				const data = room.pong.player2.getY();
				console.log(data)
				server.to(room.name).emit('life', data);
			}, 1000 / 40);
		}
	}
}
