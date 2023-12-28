export class Ball {
	x: number
	y: number
	width: number
	height: number
	resetting: boolean
	dx: number
	dy: number
	speed: number
	color: string

	constructor(height: number, width: number) {
		this.speed = 4
		this.x = width / 2
		this.y = height / 2
		this.height = 15
		this.width = 15
		this.resetting = false
		this.dx = this.speed
		this.dy = -this.speed
		this.color = ""
	}

	life() {
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
		this.dy = -this.speed
	}

	up() {
		this.dy = this.speed
	}

	lefftePaddle(lefftePaddleY: number) {
		const paddleWhere = (this.y - lefftePaddleY) / 75;
		const velocity = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
		const angle = paddleWhere < 0.5 ? ((paddleWhere - 0.5) * 100) * Math.PI / 180 : ((paddleWhere - 0.5) * 100) * Math.PI / 180;
		this.dx = Math.abs(Math.cos(angle) * velocity);
		this.dy = Math.sin(angle) * velocity;
		this.x += this.width
	}

	rightPaddle(rightPaddleY: number) {
		const paddleWhere = (this.y - rightPaddleY) / 75;
		const velocity = Math.sqrt(Math.pow(this.dx, 2) + Math.pow(this.dy, 2));
		const angle = paddleWhere < 0.5 ? ((paddleWhere - 0.5) * 100) * Math.PI / 180 : ((paddleWhere - 0.5) * 100) * Math.PI / 180;
		this.dx = Math.abs(Math.cos(angle) * velocity) * (-1);
		this.dy = Math.sin(angle) * velocity;
		this.x -= this.width
	}

	reset() {
		this.x = 750 / 2
		this.y = 585 / 2

		if (this.dx < this.speed) {
			this.dx = -this.speed
			this.dy = -this.speed
		}
		else {
			this.dx = this.speed
			this.dy = -this.speed
		}
	}
}