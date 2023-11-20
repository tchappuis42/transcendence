import { Ball, Paddle } from "./gameInterface";

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
	context.fillStyle = color
	context.fillRect(ball.x, ball.y, ball.width, ball.height);
}

export function drawGame(context: CanvasRenderingContext2D, leftPaddle: Paddle, rightPaddle: Paddle) {
	context.fillStyle = 'white';
	context.font = "30px Arial"
	context.fillText(leftPaddle.score.toString(), 100, 70);
	context.fillText(rightPaddle.score.toString(), 650, 70);
}

export function drawPaddle(context: CanvasRenderingContext2D, leftPaddle: Paddle, rightPaddle: Paddle, color: string) {
	context.fillStyle = color
	context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
	context.fillStyle = color
	context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
	context.font = "30px Arial"
	context.fillText(leftPaddle.score.toString(), 100, 70);
	context.fillText(rightPaddle.score.toString(), 650, 70);
}