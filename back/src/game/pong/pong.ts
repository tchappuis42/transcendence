import { Ball } from "./ball"
import { Paddle } from "./paddle"

export class Pong {
	player1: Paddle
	player2: Paddle
	ball: Ball
	start: boolean
	height: number
	width: number
	ready: boolean

	constructor() {
		this.height = 585
		this.width = 750
		this.player1 = new Paddle(45, (this.height / 2) - 40)
		this.player2 = new Paddle(this.width - 45, (this.height / 2) - 40)
		this.ball = new Ball(this.height, this.width)
		this.ready = false
	}

	pongLife() {
		if (this.player1.ready && this.player2.ready)
			this.ready = true

		if (this.ready) {
			if (this.player1.score < 10 && this.player2.score < 10) {
				this.player1.life();
				this.player2.life();
				this.ball.life();
				this.collide();
				this.score();
			}
		}
	}

	getPlayer1() {
		return this.player1;
	}

	getPlayer2() {
		return this.player2;
	}

	collides(obj1: Ball, obj2: Paddle) {
		return obj1.x < obj2.x + obj2.width &&
			obj1.x + obj1.width > obj2.x &&
			obj1.y < obj2.y + obj2.height &&
			obj1.y + obj1.height > obj2.y;
	}

	collide() {
		//collision de la balle avec le haut du plateau 
		if (this.ball.y < 15) {
			this.ball.up();
		}
		//collision de la balle avec le bas du plateau 
		if (this.ball.y + 15 > this.height - 15) {
			this.ball.down();
		}
		//collision de la balle avec le paddle de gauche 
		if (this.collides(this.ball, this.player1)) {
			this.ball.lefftePaddle(this.player1.getY());
		}
		//collision de la balle avec le paddle de droite 
		if (this.collides(this.ball, this.player2)) {
			this.ball.rightPaddle(this.player2.getY());
		}
		//collision du paddle de gauche avec le haut 
		if (this.player1.y < 15) {
			this.player1.up();
		}
		//collision du paddle de gauche avec le bas
		if (this.player1.y > 585 - 15 - this.player1.height) {
			this.player1.down();
		}
		//collision du paddle de droite avec le haut 
		if (this.player2.y < 15) {
			this.player2.up();
		}
		//collision du paddle de droite avec le bas 
		if (this.player2.y > 585 - 15 - this.player2.height) {
			this.player2.down();
		}
	}

	score() {
		if ((this.ball.x < -15 || this.ball.x > this.width) && !this.ball.resetting) {
			if (this.ball.x < -15) {
				this.player2.incrementScore();
			}
			if (this.ball.x > this.width) {
				this.player1.incrementScore();
			}
			if (this.player1.score < 10 && this.player2.score < 10) {
				this.ball.resetting = true
				// give some time for the player to recover before launching the ball again
				setTimeout(() => {
					this.ball.resetting = false
					this.ball.reset();
				}, 400);
			}
		}
	}


	//debug
	q() {
		this.ball.reset()
		this.player1.reset()
		this.player2.reset()
	}

	getdata() {
		const data = {
			playOne: this.player1.getY(),
			playTwo: this.player2.getY(),
			ballX: this.ball.getX(),
			ballY: this.ball.getY(),
			score1: this.player1.score,
			score2: this.player2.score,
		}
		return data;
	}
}
