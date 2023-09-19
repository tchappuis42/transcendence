
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
		console.log("x ===", this.x)
		console.log("y ===", this.y)
	}

	moveUp() {
		this.y -= this.speed;
	}

	moveDown() {
		this.y += this.speed;
	}

	getY() {
		return this.y
	}
}