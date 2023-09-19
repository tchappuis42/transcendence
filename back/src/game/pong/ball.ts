export class Ball {
	x: number //width / 2,
	y: number //height / 2,
	width: number
	height: number
	resetting: boolean
	dx: number
	dy: number
	speed: number

	constructor(height: number, width: number) {
		this.speed = 4
		this.x = height / 2
		this.y = width / 2
		this.height = 15
		this.width = 15
		this.resetting = false
		this.dx = this.speed
		this.dy -= this.speed
	}

	ballLife() {
		this.x = this.x + this.dx;
		this.y = this.y + this.dy;
	}

	getX() {
		return this.x;
	}

	getY() {
		return this.y;
	}

	down() {
		this.dy -= this.speed
	}

	up() {
		this.dy = this.speed
	}
}