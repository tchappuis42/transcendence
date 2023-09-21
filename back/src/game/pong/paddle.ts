
export class Paddle {
	x: number;
	y: number;
	width: number;
	height: number;
	dy: number;
	speed: number;
	score: number;
	ready: boolean;

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
		this.width = 1
		this.height = 75
		this.dy = 0
		this.speed = 7
		this.score = 0
		this.ready = false
	}

	life() {
		this.y = this.y + this.dy
		//console.log("speed = ", this.speed)
	}

	incrementScore() {
		this.score += 1;
	}

	moveUp() {
		this.dy = -this.speed
	}

	moveDown() {
		this.dy = this.speed;
	}

	moveEnd() {
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
		console.log("ready = ", this.ready)
	}
}