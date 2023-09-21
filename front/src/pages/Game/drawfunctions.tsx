import { Ball, Game, Paddle } from "./gameInterface";

export function drawMap(context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
	const grid = 15
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	// draw walls
	/*if (gameInfo.rgb === true) {
		if (ball.color % 30 < 10)
			context.fillStyle = 'red';
		else if (ball.color % 30 < 20)
			context.fillStyle = 'blue';
		else
			context.fillStyle = 'yellow';
	}
	else*/
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, grid);
	context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

	// draw dotted line down the middle
	for (let i = grid; i < canvas.height - grid; i += grid * 2) {
		context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
	}
}

export function drawBall(context: CanvasRenderingContext2D, ball: Ball) {
	/*if (gameInfo.rgb === true) {
		if (ball.color % 30 < 10)
			context.fillStyle = 'red';
		else if (ball.color % 30 < 20)
			context.fillStyle = 'blue';
		else
			context.fillStyle = 'yellow';
	}
	else*/
	//console.log("ici ball =", ball)
	context.fillStyle = 'white';
	context.fillRect(ball.x, ball.y, ball.width, ball.height);
}

export function drawGame(context: CanvasRenderingContext2D, leftPaddle: Paddle, rightPaddle: Paddle) {
	// draw score
	context.fillStyle = 'white';
	context.font = "30px Arial"
	context.fillText(leftPaddle.score.toString(), 650, 70);
	context.fillText(rightPaddle.score.toString(), 100, 70);
}

export function drawPaddle(context: CanvasRenderingContext2D, leftPaddle: Paddle, rightPaddle: Paddle) {
	// draw paddles
	/*	if (gameInfo.rgb) {
			if (leftPaddle.color % 3 === 0)
				context.fillStyle = 'red';
			if (leftPaddle.color % 3 === 1)
				context.fillStyle = 'blue';
			if (leftPaddle.color % 3 === 2)
				context.fillStyle = 'yellow';
		}
		else*/
	context.fillStyle = 'white';
	//context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
	context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width - 14, leftPaddle.height);
	/*if (gameInfo.rgb) {
		if (rightPaddle.color % 3 === 0)
			context.fillStyle = 'red';
		if (rightPaddle.color % 3 === 1)
			context.fillStyle = 'blue';
		if (rightPaddle.color % 3 === 2)
			context.fillStyle = 'yellow';
	}
	else*/
	context.fillStyle = 'white';
	context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width + 14, rightPaddle.height);
}