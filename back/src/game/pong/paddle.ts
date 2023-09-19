
export class Paddle {
	x: number;
	y: number;
	width: number;
	height: number;
	dy: number;
	speed: number;

	constructor(x: number, y: number) {
		this.x = x
		this.y = y
		this.width = 1
		this.height = 80
		this.dy = 0
		this.speed = 7
	}

	life() {
		this.y = this.y + this.dy
		//console.log("speed = ", this.speed)
	}

	moveUp() {
		//this.y -= this.speed;
		this.dy -= this.speed
	}

	moveDown() {
		//this.y += this.speed;
		this.dy += this.speed;
	}

	moveEnd() {
		this.dy = 0;
	}

	getY() {
		return this.y
	}
}