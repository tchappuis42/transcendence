class Pong {
	player1: Paddle
	player2: Paddle
	ball: string
	start: boolean
	height: 585
	width: 750

	constructor() {
		this.player1 = new Paddle(45, (this.height / 2) - 40)
		this.player2 = new Paddle(this.width - 45, (this.height / 2) - 40)
	}
}