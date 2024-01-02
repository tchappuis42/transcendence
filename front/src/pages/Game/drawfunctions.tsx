import { Ball, Paddle } from "./gameInterface";

type Bonus = {
	x : number;
	y : number;
	color : string
}

export function drawMap(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string) {
	const grid = 15
	context.fillStyle = color;
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, grid);
	context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);
	for (let i = grid; i < canvas.height - grid; i += grid * 2) {
		context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
	}
}

export function drawBall(context: CanvasRenderingContext2D, ball: Ball, color: string) {

	context.fillStyle = ball.color ? ball.color : color;
	context.fillRect(ball.x, ball.y, ball.width, ball.height);
}

export function drawBonus(context: CanvasRenderingContext2D, bonus : Bonus | null) {
	if(bonus)
	{
		context.fillStyle = bonus.color;
		context.fillRect(bonus.x, bonus.y, 100, 100);
	}
}

export function drawGame(context: CanvasRenderingContext2D, leftPaddle: Paddle, rightPaddle: Paddle) {
	context.fillStyle = 'white';
	context.font = "30px Arial"
	context.fillText(leftPaddle.score.toString(), 100, 70);
	context.fillText(rightPaddle.score.toString(), 650, 70);
}

export function drawPaddle(context: CanvasRenderingContext2D, leftPaddle: Paddle, rightPaddle: Paddle, color: string) {

	context.fillStyle = leftPaddle.color ? leftPaddle.color : color
	context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.paddleWidth + 14, leftPaddle.paddleHeight);
	context.fillStyle = rightPaddle.color ? rightPaddle.color : color
	context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.paddleWidth + 14, rightPaddle.paddleHeight);
	context.font = "30px Arial"
	context.fillText(leftPaddle.score.toString(), 100, 70);
	context.fillText(rightPaddle.score.toString(), 650, 70);
}