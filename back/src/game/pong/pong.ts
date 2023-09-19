import { Ball } from "./ball"
import { Paddle } from "./paddle"

export class Pong {
	player1: Paddle
	player2: Paddle
	ball: Ball
	start: boolean
	height: number
	width: number

	constructor() {
		this.height = 585
		this.width = 750
		this.player1 = new Paddle(45, (this.height / 2) - 40)
		this.player2 = new Paddle(this.width - 45, (this.height / 2) - 40)
		this.ball = new Ball(this.height, this.width)
	}

	pongLife() {
		this.player1.life();
		this.player2.life();
		this.colide();
	}

	getPlayer1() {
		return this.player1;
	}

	getPlayer2() {
		return this.player2;
	}

	colide() {
		if (this.ball.y < 15) {
			this.ball.up();
		}
		if (this.ball.y + 15 > this.height - 15) {
			this.ball.down();
		}
	}

	getdata() {
		const ret = {
			playOne: this.player1.getY(),
			playTwo: this.player2.getY(),
			ballX: this.ball.getX(),
			ballY: this.ball.getY(),
		}
		return ret;
	}
}
