import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { UserDto } from 'src/user/dtos/UserDto';
import { CreatGameDTO } from './dtos/creatGame.dto';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { UserService } from 'src/user/user.service';
import { Paddle } from './pong/paddle';
import { Pong } from './pong/pong';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository } from 'typeorm';

interface roomName {
	name: string;
	socket1: Socket;
	socket2: Socket
	pong: Pong;
	intervalId?: NodeJS.Timer;
	timeStart: number
}

@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game) private gameRepository: Repository<Game>, private readonly userservice: UserService) { }

	waitingGame: Socket;
	rooms: roomName[] = []; //tableau de room

	matchmaking(user: UserDto, client: Socket, server: Server): number | CreatGameDTO {
		//check si le joueur et deja en game ---> retourner un message "vous etes deja en game" todo attendre le systeme de status
		//check si le joueur et deja en machtmaking ---> retourner un message "vous etes deja en recheche de partie"
		//check si y'a un joueur en matchmaking ---> oui creer la game, non mettre le joueur en matchmaking, et si la socket et la meme sortie de la recheche de game
		if (this.waitingGame) {
			if (this.waitingGame === client) {
				this.waitingGame = null;
				return 2
			}
			if (client.data.user.id === this.waitingGame.data.user.id)
				return 3
			let element: roomName = {
				name: user.username,
				socket1: client,
				socket2: this.waitingGame,
				pong: new Pong(),
				intervalId: setInterval(() => this.life(server, client), 1000 / 60),
				timeStart: new Date().getTime()
			}
			console.log("le timer = ", element.timeStart)
			this.rooms.push(element);
			client.join(element.name);
			this.waitingGame.join(element.name);
			this.life(server, client);

			const data: any = { // todo
				roomName: element.name,
				idOne: element.socket1.data.user.id,
				idTwo: element.socket2.data.user.id
			}
			this.waitingGame = null;
			return data;
		}
		else {
			this.waitingGame = client;
			return 1;
		}
	}

	findRoom(client: Socket) {
		//console.log("rooms = ", this.rooms)
		let room = this.rooms.find(room => room.socket1 === client)
		if (room)
			return room;

		let room2 = this.rooms.find(room => room.socket2 === client)
		if (room2)
			return room2;
	}

	//debug
	clean(client: Socket) {
		const room = this.findRoom(client)
		if (room) {
			room.socket1.leave(room.name)
			room.socket2.leave(room.name)
			clearInterval(room.intervalId);
			this.rooms = this.rooms.filter((r) => r.name !== room.name)
		}
	}

	cleanRoom(room: roomName) {
		//console.log("cleaning room")
		if (room) {
			room.socket1.leave(room.name)
			room.socket2.leave(room.name)
			clearInterval(room.intervalId);
			this.rooms = this.rooms.filter((r) => r.name !== room.name)
		}
	}

	//sort du matchmaking
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
			//console.log("data = ", data)
			if (data === 'up') {
				player.moveUp();
			}
			else if (data === 'down') {
				player.moveDown();
			}
			else if (data === 'keyup') {
				player.upEnd();
			}
			else if (data === 'keydown') {
				player.downEnd();
			}
			else if (data === 'ready') {
				player.playerReady();
			}

			//debug
			else if (data === 'q')
				room.pong.q();
			//	console.log("y = ", player.y)
		}
	}

	//a la fin clean la room et sauv le score
	async life(server: Server, client: Socket) {
		const room = this.findRoom(client);
		if (room) {

			const timeNow = new Date().getTime()

			//met la game en ready apres 1minute
			if (timeNow - room.timeStart > 60000 && room.pong.ready === false) {
				if (room.pong.player1.ready === true || room.pong.player2.ready === true) {
					room.pong.getPlayer1().playerReady();
					room.pong.getPlayer2().playerReady();
				}
				else
					this.cleanRoom(room)
			}

			room.pong.pongLife();
			server.to(room.name).emit('life', room.pong.getdata());
			if (room.pong.player1.score === 10 || room.pong.player2.score === 10) {

				const newGame = new Game();
				newGame.scoreOne = room.pong.player1.score;
				newGame.scoreTwo = room.pong.player2.score;
				newGame.userOne = room.socket1.data.user;
				newGame.userTwo = room.socket2.data.user;

				if (room.pong.player1.score === 10) {
					const data = 'victoir de ' + room.socket1.data.user.username
					server.to(room.name).emit('score', data)
				}

				if (room.pong.player2.score === 10) {
					const data = 'victoir de ' + room.socket2.data.user.username
					server.to(room.name).emit('score', data)
				}

				this.cleanRoom(room)
				await this.userservice.saveScore(newGame);
				await this.gameRepository.save(newGame);
			}
		}

	}

	async getGameByUser(userId: number) {
		const user = await this.userservice.validateUser(userId)
		const games = await this.gameRepository.find({ where: [{ userOne: user }, { userTwo: user }] })
		const matchs = games.map(match => {
			if (match.scoreOne > match.scoreTwo)
				return { userOne: match.userOne.username, userTwo: match.userTwo.username, scoreOne: match.scoreOne, scoreTwo: match.scoreTwo, winner: match.userOne.username }
			else
				return { userOne: match.userOne.username, userTwo: match.userTwo.username, scoreOne: match.scoreOne, scoreTwo: match.scoreTwo, winner: match.userTwo.username }
		});
		return matchs;
	}

	async cleanData(userId: number) {
		const user = await this.userservice.validateUser(userId)
		//await this.gameRepository.delete({ where: [{ userOne: user }, { userTwo: user }] })
	}

	getinfo(client: Socket) {
		if (client === this.waitingGame)
			return 1
		const inGame = this.rooms.find(r => client === r.socket1 || client === r.socket2)
		if (inGame) {
			const data: any = {
				idOne: inGame.socket1.data.user.id,
				idTwo: inGame.socket2.data.user.id,
				readyOne: inGame.pong.getPlayer1().ready,
				readyTwo: inGame.pong.getPlayer2().ready
			}
			return data
		}
		// return todo
	}
}
