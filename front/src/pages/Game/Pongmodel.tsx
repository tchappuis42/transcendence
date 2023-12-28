import React, { useRef, useEffect, useState } from 'react';

interface Paddle {
	x: number;
	y: number;
	width: number;
	height: number;
	dy: number;
	color: number;
}

interface Game {
	start: boolean;
	score_left: number;
	score_right: number;
	winner: number;
	rgb: boolean;
}

interface Ball {
	x: number,
	y: number,
	width: number,
	height: number,
	resetting: boolean,
	dx: number,
	dy: number,
	color: number;
}


const Pong = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const height = 585;
	const width = 750;
	const grid = 15;
	const paddleHeight = grid * 5; // 80
	const maxPaddleY = 585 - grid - paddleHeight;
	const paddleSpeed = 7;
	const ballSpeed = 4;

	const [ball, setBall] = useState<Ball>({
		x: width / 2,
		y: height / 2,
		width: grid,
		height: grid,
		resetting: false,
		dx: ballSpeed,
		dy: -ballSpeed,
		color: 1,
	})

	const [leftPaddle, setleftpaddle] = useState<Paddle>({
		// start in the middle of the game on the left side
		x: (grid * 2) + 15,
		y: height / 2 - paddleHeight / 2,
		width: 1,
		height: paddleHeight,
		color: 1,
		// paddle velocity
		dy: 0,
	});

	const [rightPaddle, setrightpaddle] = useState<Paddle>({
		// start in the middle of the game on the left side
		x: 750 - (grid * 3),
		y: 585 / 2 - paddleHeight / 2,
		width: 1,
		height: paddleHeight,
		color: 1,
		// paddle velocity
		dy: 0,
	});

	const [gameInfo, setGameinfo] = useState<Game>({
		start: false,
		score_left: 0,
		score_right: 0,
		winner: 0,
		rgb: false,
	});

	function collides(obj1: Ball, obj2: Paddle) {
		return obj1.x < obj2.x + obj2.width &&
			obj1.x + obj1.width > obj2.x &&
			obj1.y < obj2.y + obj2.height &&
			obj1.y + obj1.height > obj2.y;
	}

	const drawMap = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);

		// draw walls
		if (gameInfo.rgb === true) {
			if (ball.color % 30 < 10)
				context.fillStyle = 'red';
			else if (ball.color % 30 < 20)
				context.fillStyle = 'blue';
			else
				context.fillStyle = 'yellow';
		}
		else
			context.fillStyle = 'white';
		context.fillRect(0, 0, canvas.width, grid);
		context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

		// draw dotted line down the middle
		for (let i = grid; i < canvas.height - grid; i += grid * 2) {
			context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
		}
	}

	const drawBall = (context: CanvasRenderingContext2D, ball: Ball) => {
		if (gameInfo.rgb === true) {
			if (ball.color % 30 < 10)
				context.fillStyle = 'red';
			else if (ball.color % 30 < 20)
				context.fillStyle = 'blue';
			else
				context.fillStyle = 'yellow';
		}
		else
			context.fillStyle = 'white';
		context.fillRect(ball.x, ball.y, ball.width, ball.height);
		context.beginPath();
		context.arc(ball.x, ball.y, 50, 0, 2 * Math.PI);
	}

	const drawGame = (context: CanvasRenderingContext2D, gameInfo: Game) => {
		// draw score
		context.fillStyle = 'white';
		context.font = "30px Arial"
		context.fillText(gameInfo.score_left.toString(), 650, 70);
		context.fillText(gameInfo.score_right.toString(), 100, 70);
	}

	const drawPaddle = (context: CanvasRenderingContext2D, leftPaddle: Paddle, rightPaddle: Paddle) => {
		// draw paddles
		if (gameInfo.rgb) {
			if (leftPaddle.color % 3 === 0)
				context.fillStyle = 'red';
			if (leftPaddle.color % 3 === 1)
				context.fillStyle = 'blue';
			if (leftPaddle.color % 3 === 2)
				context.fillStyle = 'yellow';
		}
		else
			context.fillStyle = 'white';
		//context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
		context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width - 14, leftPaddle.height);
		if (gameInfo.rgb) {
			if (rightPaddle.color % 3 === 0)
				context.fillStyle = 'red';
			if (rightPaddle.color % 3 === 1)
				context.fillStyle = 'blue';
			if (rightPaddle.color % 3 === 2)
				context.fillStyle = 'yellow';
		}
		else
			context.fillStyle = 'white';
		context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width + 14, rightPaddle.height);
	}

	const keyDownHandler = (e: KeyboardEvent) => {
		e.preventDefault();
		if (e.key === "w") {
			setleftpaddle({ ...leftPaddle, dy: -paddleSpeed })
		}
		if (e.key === "s") {
			setleftpaddle({ ...leftPaddle, dy: paddleSpeed })
		}
		if (e.key === "ArrowUp") {
			setrightpaddle({ ...rightPaddle, dy: -paddleSpeed })
		}
		if (e.key === "ArrowDown") {
			setrightpaddle({ ...rightPaddle, dy: paddleSpeed })
		}
		if (e.key === "q") {
			setBall({ ...ball, x: width / 2, y: height / 2 })
			setGameinfo({ ...gameInfo, score_left: 0, score_right: 0 })
		}
		if (e.key === "z") {
			setGameinfo({ ...gameInfo, start: true })
		}
		if (e.key === "p") {
			if (gameInfo.rgb === true)
				setGameinfo({ ...gameInfo, rgb: false })
			else
				setGameinfo({ ...gameInfo, rgb: true })
		}
	}

	const keyUpHandler = (e: KeyboardEvent) => {
		if (e.key === "w" && leftPaddle.dy < 0) {
			setleftpaddle({ ...leftPaddle, dy: 0 })
		}
		if (e.key === "s" && leftPaddle.dy > 0) {
			setleftpaddle({ ...leftPaddle, dy: 0 })
		}
		if (e.key === "ArrowUp" && rightPaddle.dy < 0) {
			setrightpaddle({ ...rightPaddle, dy: 0 })
		}
		if (e.key === "ArrowDown" && rightPaddle.dy > 0) {
			setrightpaddle({ ...rightPaddle, dy: 0 })
		}
	}

	const paddlelogic = () => {
		//left paddle logic
		if (leftPaddle.y < grid) {
			setleftpaddle((prevPaddle) => ({
				...prevPaddle,
				y: grid,
			}));
		}
		if (leftPaddle.y > maxPaddleY) {
			setleftpaddle((prevPaddle) => ({
				...prevPaddle,
				y: maxPaddleY,
			}));
		}
		//rightpaddle logic
		if (rightPaddle.y < grid) {
			setrightpaddle((prevPaddle) => ({
				...prevPaddle,
				y: grid,
			}));
		}
		if (rightPaddle.y > maxPaddleY) {
			setrightpaddle((prevPaddle) => ({
				...prevPaddle,
				y: maxPaddleY,
			}));
		}
	}

	const ballLogic = () => {
		//ball logic
		//collision avec les murs
		if (ball.y < grid) {
			setBall((prevBall) => ({
				...prevBall,
				dy: ballSpeed,
				y: grid,
			}));
		}
		if (ball.y + grid > height - grid) {
			setBall((prevBall) => ({
				...prevBall,
				dy: -ballSpeed,
				y: height - grid * 2,
			}));
		}
		//collision avec les pads
		if (collides(ball, leftPaddle)) {
			// move ball next to the paddle otherwise the collision will happen again
			// in the next frame
			setBall((prevBall) => ({
				...prevBall,
				dx: prevBall.dx * -1,
				x: prevBall.x + prevBall.width,

			}));
			setleftpaddle({ ...leftPaddle, color: leftPaddle.color + 1 })
			//increases the speed of the ball by 0.2 each time it touches a pad
			if (ball.dx < 6) {
				setBall((prevBall) => ({
					...prevBall,
					dx: prevBall.dx += 0.2,
					dy: prevBall.dy += 0.2,
					x: prevBall.x += 0.2,
					y: prevBall.y += 0.2,
				}));
			}
		}
		if (collides(ball, rightPaddle)) {
			// 	ball.dx *= -1;
			setBall((prevBall) => ({
				...prevBall,
				dx: prevBall.dx * (-1),
				x: prevBall.x - prevBall.width,
			}));
			setrightpaddle({ ...rightPaddle, color: rightPaddle.color + 1 })
			// 	// move ball next to the paddle otherwise the collision will happen again
			// 	// in the next frame
			// 	ball.x = rightPaddle.x - ball.width;

			// 	//increases the speed of the ball by 0.2 each time it touches a pad
			if (ball.dx > -6) {
				setBall((prevBall) => ({
					...prevBall,
					dx: prevBall.dx -= 0.2,
					dy: prevBall.dy -= 0.2,
					x: prevBall.x -= 0.2,
					y: prevBall.y -= 0.2,
				}));
			}
		}

		// reset ball if it goes past paddle (but only if we haven't already done so)
		if ((ball.x < 0 || ball.x > width) && !ball.resetting) {
			if (ball.x < 0) {
				setGameinfo((prevGame) => ({
					...prevGame,
					score_left: prevGame.score_left + 1,
				}));
			}
			if (ball.x > width) {
				setGameinfo((prevGame) => ({
					...prevGame,
					score_right: prevGame.score_right + 1,
				}));
			}
			setBall((prevBall) => ({
				...prevBall,
				resetting: true,
			}));
			// give some time for the player to recover before launching the ball again
			setTimeout(() => {
				setBall((prevBall) => ({
					...prevBall,
					resetting: false,
					x: width / 2,
					y: height / 2,
					dx: ballSpeed,
					dy: ballSpeed,
				}));
			}, 400);
		}
	}

	useEffect(() => {
		//if (gameInfo.start == true) {
		const handleGameUpdate = () => {
			setleftpaddle((prevPaddle) => ({
				...prevPaddle,
				y: prevPaddle.y + prevPaddle.dy
			}));
			setrightpaddle((prevPaddle) => ({
				...prevPaddle,
				y: prevPaddle.y + prevPaddle.dy
			}));
			setBall((prevBall) => ({
				...prevBall,
				x: prevBall.x + prevBall.dx,
				y: prevBall.y + prevBall.dy,
				color: prevBall.color + 1,
			}));
		};
		const gameLoop = setInterval(handleGameUpdate, 1000 / 40);
		return () => {
			clearInterval(gameLoop);
		};
		//}
	}, []);



	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas)
			return;
		canvas.width = width;
		canvas.height = height;
		canvas.id = "pong";
		const context = canvas.getContext("2d");
		if (!context)
			return;
		drawMap(context, canvas);
		drawPaddle(context, leftPaddle, rightPaddle);
		drawGame(context, gameInfo);
		drawBall(context, ball);
		window.addEventListener('keydown', keyDownHandler);
		window.addEventListener('keyup', keyUpHandler);
		paddlelogic();
		ballLogic();
		return () => {
			window.removeEventListener("keydown", keyDownHandler);
			window.removeEventListener("keyup", keyUpHandler);
		};
	}, [leftPaddle, ball, rightPaddle]);

	return (
		<div >
			<div id="pong" className='pong'>
				<canvas ref={canvasRef} />
			</div>
		</div>
	);
};

export default Pong;