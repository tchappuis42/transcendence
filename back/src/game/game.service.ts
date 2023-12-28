import { Injectable, Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { UserDto } from 'src/user/dtos/UserDto';
import { CreatGameDTO } from './dtos/creatGame.dto';
import { UserService } from 'src/user/user.service';
import { Paddle } from './pong/paddle';
import { Pong } from './pong/pong';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from './game.entity';
import { Repository } from 'typeorm';
import { ConnctionState } from 'src/user/dtos/ConnectionStateEnum';
import { clearInterval } from 'timers';

interface roomName {
	name: string;
	socket1: Socket;
	socket2: Socket;
	pong: Pong;
	intervalId?: NodeJS.Timer;
	timeStart: number
}

interface GameInvit {
	socket: Socket;
	id1: number;
	id2: number;
}

enum gameState {
	enRecherchedePartie = 1,
	finDeRecherche = 2,
	dejaEnRecherche = 3,
	dejaEnGame = 4
}

@Injectable()
export class GameService {
	constructor(
		@InjectRepository(Game) private gameRepository: Repository<Game>, private readonly userservice: UserService) { }

	waitingGame: Socket;
	bonus: boolean;
	rooms: roomName[] = []; //tableau de room
	gameInvit: GameInvit[] = []; //tableau des invitations de game

	//check si y'a un joueur en matchmaking ---> oui creer la game, non mettre le joueur en matchmaking, et si la socket et la meme sortie de la recheche de game
	async matchmaking(user: UserDto, client: Socket, server: Server, bonus: boolean): Promise<number | CreatGameDTO> {
		//check si le joueur et deja en game
		const clientStatue = await this.userservice.userStatue(client.data.user.id)
		if (clientStatue === ConnctionState.InGame)
			return gameState.dejaEnGame

		//chek si un joueur et en matchmaking
		if (this.waitingGame) {

			//sort le client du matchmaking
			if (this.waitingGame === client) {
				this.waitingGame = null;
				this.bonus = null;
				return gameState.finDeRecherche
			}

			//check si le joueur et deja en machtmaking ---> retourner un message "vous etes deja en recheche de partie"
			if (client.data.user.id === this.waitingGame.data.user.id)
				return gameState.dejaEnRecherche

			//suprimer toute les invit de game
			this.gameInvit = this.gameInvit.filter(game => game.id1 !== user.id)

			//creer une nouvelle room de jeu
			const bonusActivate = this.bonus && bonus ? true : false;
			let element: roomName = {
				name: user.username + "gameroom",
				socket1: client,
				socket2: this.waitingGame,
				pong: new Pong(bonusActivate),
				intervalId: setInterval(() => this.life(server, client), 1000 / 60),
				timeStart: new Date().getTime()
			}
			this.rooms.push(element);
			client.join(element.name);
			this.waitingGame.join(element.name);
			//change le statue des joueur en ingame
			await this.userservice.StatueGameOn(client.data.user.id, server)
			await this.userservice.StatueGameOn(this.waitingGame.data.user.id, server)
			//retourn aux clients les info de la room
			const data: CreatGameDTO = {
				roomName: element.name,
				idOne: element.socket1.data.user.id,
				idTwo: element.socket2.data.user.id
			}
			this.waitingGame = null;
			this.bonus = null;
			return data;
		}
		// met le client en matchmaking
		else {
			this.gameInvit = this.gameInvit.filter(game => game.id1 !== user.id)
			this.waitingGame = client;
			this.bonus = bonus;
			return gameState.enRecherchedePartie;
		}
	}

	findRoom(client: Socket) {
		let room = this.rooms.find(room => room.socket1 === client)
		if (room)
			return room;
		let room2 = this.rooms.find(room => room.socket2 === client)
		if (room2)
			return room2;
	}

	//suprime la room
	async cleanRoom(room: roomName, server: Server) {
		if (room) {
			room.socket1.leave(room.name)
			room.socket2.leave(room.name)
			clearInterval(room.intervalId);
			await this.userservice.StatueGameOff(room.socket1.data.user.id, server)
			await this.userservice.StatueGameOff(room.socket2.data.user.id, server)
			this.rooms = this.rooms.filter((r) => r.name !== room.name)
		}
	}

	//sort du matchmaking
	cleanMM(client: Socket) {
		if (client === this.waitingGame) {
			this.waitingGame = null;
			this.bonus = null;
		}
	}


	//pandant la game recupaire les imputs des joueur pour faire bouger les raquettes
	paddle(client: Socket, data: string) {
		const room = this.findRoom(client)
		let player: Paddle | null = null;
		if (client === room.socket1)
			player = room.pong.getPlayer1();
		if (client === room.socket2)
			player = room.pong.getPlayer2();

		if (player) {
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
				//si personne est ready clean la room
				else {
					server.to(room.name).emit('score', "match nul")
					await this.cleanRoom(room, server)
				}
			}

			//mets a jour la game
			room.pong.pongLife();
			server.to(room.name).emit('life', room.pong.getdata());

			//mets fin a la game si un joueur attein 10 de score
			if (room.pong.player1.score === 10 || room.pong.player2.score === 10) {

				const newGame = new Game();
				newGame.idOne = room.socket1.data.user.id;
				newGame.idTwo = room.socket2.data.user.id;
				newGame.scoreOne = room.pong.player1.score;
				newGame.scoreTwo = room.pong.player2.score;
				newGame.userOne = room.socket1.data.user;
				newGame.userTwo = room.socket2.data.user;
				clearInterval(room.pong.intervalId);

				//envois aux clients le score
				if (room.pong.player1.score === 10) {
					const data = 'victoir de ' + room.socket1.data.user.username
					server.to(room.name).emit('score', data)
				}

				if (room.pong.player2.score === 10) {
					const data = 'victoir de ' + room.socket2.data.user.username
					server.to(room.name).emit('score', data)
				}

				//clean la room et save les nouveaux scores des joueurs et save la game
				await this.cleanRoom(room, server)
				await this.userservice.saveScore(newGame);
				await this.gameRepository.save(newGame);
			}
		}

	}

	//recupere l'historique des games d'un client
	async getGameByUser(userId: number) {
		const user = await this.userservice.validateUser(userId)
		const games = await this.gameRepository.find({ where: [{ idOne: user.id }, { idTwo: user.id }] })
		const matchs = games.map(match => {
			if (match.scoreOne > match.scoreTwo)
				return { userOne: match.userOne.username, userTwo: match.userTwo.username, scoreOne: match.scoreOne, scoreTwo: match.scoreTwo, winnerId: match.userOne.id, avatarOne: match.userOne.avatar, avatarTwo: match.userTwo.avatar }
			else
				return { userOne: match.userOne.username, userTwo: match.userTwo.username, scoreOne: match.scoreOne, scoreTwo: match.scoreTwo, winnerId: match.userTwo.id, avatarOne: match.userOne.avatar, avatarTwo: match.userTwo.avatar }
		});
		return matchs; //
	}

	//recupere les info du client quand il revient sur la page game
	getinfo(client: Socket) {
		//return 1 si il est en recherche de partie
		if (client === this.waitingGame)
			return gameState.enRecherchedePartie
		//retourn les info de game si il est en partie
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
	}

	async GameInvit(client: Socket, userId: number) {
		if (this.waitingGame) {
			if (client.data.user.id === this.waitingGame.data.user.id)
				return gameState.dejaEnRecherche
		}
		const clientStatue = await this.userservice.userStatue(client.data.user.id)
		if (clientStatue === ConnctionState.InGame)
			return gameState.dejaEnGame

		else { //si pas en game creer une invit de jeu
			const user = client.data.user as UserDto;
			let gameInvit: GameInvit = {
				socket: client,
				id1: user.id,
				id2: userId
			}
			this.gameInvit.push(gameInvit);
			return {
				id: user.id,
				message: "game invit"
			}
		}
	}

	async joinGame(client: Socket, userId: number, server: Server) {
		const user = client.data.user as UserDto;

		if (this.waitingGame) {
			if (client.data.user.id === this.waitingGame.data.user.id)
				return {
					success: false,
					id: userId
				}
		}

		const clientStatue = await this.userservice.userStatue(client.data.user.id)
		if (clientStatue === ConnctionState.InGame) {
			return {
				success: false,
				id: userId
			}
		}

		if (this.gameInvit.length > 0) {
			const invit = this.gameInvit.find(game => game.id1 === userId && game.id2 === user.id)
			if (!invit)
				return {
					success: false,
					id: userId
				}
			this.gameInvit = this.gameInvit.filter(game => game.id1 !== user.id);
			this.gameInvit = this.gameInvit.filter(game => game.id1 !== userId);
			let element: roomName = {
				name: user.username + "gameroom",
				socket1: client,
				socket2: invit.socket,
				pong: new Pong(false),
				intervalId: setInterval(() => this.life(server, client), 1000 / 60),
				timeStart: new Date().getTime()
			}
			await this.userservice.StatueGameOn(user.id, server)
			await this.userservice.StatueGameOn(userId, server)
			this.rooms.push(element);
			client.join(element.name);
			invit.socket.join(element.name);
			return {
				success: true,
				roomName: element.name,
			}
		}
		return {
			success: false,
			id: userId
		}
	}
}
