import { Paddle } from "./paddle"

export class Pong {
	player1: Paddle
	player2: Paddle
	ball: string
	start: boolean
	height: number
	width: number

	constructor() {
		this.height = 585
		this.width = 750
		this.player1 = new Paddle(45, (this.height / 2) - 40)
		this.player2 = new Paddle(this.width - 45, (this.height / 2) - 40)
	}

	getPlayer1() {
		return this.player1;
	}

	getPlayer2() {
		return this.player2;
	}
}
