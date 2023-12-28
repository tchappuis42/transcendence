
export class Paddle {
	x: number;
	y: number;
	width: number;
	height: number;
	dy: number;
	speed: number;
	score: number;
	ready: boolean;
	color: string;

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
		this.width = 1
		this.height = 75
		this.dy = 0
		this.speed = 7
		this.score = 0
		this.ready = false
		this.color = ""
	}

	life() {
		this.y = this.y + this.dy
	}

	public incrementScore() {
		this.score += 1;
	}

	moveUp() {
		this.dy = -this.speed
	}

	moveDown() {
		this.dy = this.speed;
	}

	upEnd() {
		if (this.dy < 0)
			this.dy = 0;
	}

	downEnd() {
		if (this.dy > 0)
			this.dy = 0;
	}

	getY() {
		return this.y
	}

	up() {
		this.y = 15
	}

	down() {
		this.y = 585 - 15 - this.height
	}

	playerReady() {
		this.ready = true;
	}
}