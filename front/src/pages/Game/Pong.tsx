import Navigation from '../../components/Navigation';
import React, { useRef, useEffect, useState } from 'react';

interface Paddle {
	x: number;
	y: number;
	width: number;
	height: number;
	dy: number;
}

interface Game {
	start: number;
	score_left: number;
	score_right: number;
	winner: number;
}

interface Ball {
	x: number,
	y: number,
	width: number,
	height: number,
	resetting: boolean,
	dx: number,
	dy: number,
}

const Pong = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const height = 585;
	const width = 750;
	const grid = 15;
	const paddleHeight = grid * 5; // 80
	const maxPaddleY = 585 - grid - paddleHeight;
	const paddleSpeed = 5;
	const ballSpeed = 5;

	const [ball, setBall] = useState<Ball>({
		x: width / 2,
		y: height / 2,
		width: grid,
		height: grid,
		resetting: false,
		dx: ballSpeed,
		dy: -ballSpeed
	})

	const [leftPaddle, setleftpaddle] = useState<Paddle>({
		// start in the middle of the game on the left side
		x: grid * 2,
		y: height / 2 - paddleHeight / 2,
		width: grid,
		height: paddleHeight,

		// paddle velocity
		dy: 0,
	});

	const [rightPaddle, setrightpaddle] = useState<Paddle>({
		// start in the middle of the game on the left side
		x: 750 - (grid * 3),
		y: 585 / 2 - paddleHeight / 2,
		width: grid,
		height: paddleHeight,

		// paddle velocity
		dy: 0,
	});

	const [gameInfo, setGameinfo] = useState<Game>({
		start: 0,
		score_left: 0,
		score_right: 0,
		winner: 0,
	});

	const drawMap = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);

		// draw walls
		context.fillStyle = 'lightgrey';
		context.fillRect(0, 0, canvas.width, grid);
		context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

		// draw dotted line down the middle
		for (let i = grid; i < canvas.height - grid; i += grid * 2) {
			context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
		}
	}

	const drawBall = (context: CanvasRenderingContext2D, ball: Ball) => {
		context.fillRect(ball.x, ball.y, ball.width, ball.height);
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
		context.fillStyle = 'white';
		context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
		context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);
	}

	const keyDownHandler = (e: KeyboardEvent) => {
		if (e.key === "w") {
			setleftpaddle({ ...leftPaddle, dy: -paddleSpeed })
		}
		if (e.key === "s") {
			setleftpaddle({ ...leftPaddle, dy: paddleSpeed })
		}
		if (e.key === "q") {
			setBall({ ...ball, x: width / 2, y: height / 2 })
		}
	}

	const keyUpHandler = (e: KeyboardEvent) => {
		if (e.key === "w") {
			setleftpaddle({ ...leftPaddle, dy: 0 })
		}
		if (e.key === "s") {
			setleftpaddle({ ...leftPaddle, dy: 0 })
		}
	}

	useEffect(() => {
		const handleGameUpdate = () => {
			setleftpaddle((prevPaddle) => ({
				...prevPaddle,
				y: prevPaddle.y + prevPaddle.dy
			}));
			setBall((prevBall) => ({
				...prevBall,
				x: prevBall.x + prevBall.dx,
				y: prevBall.y + prevBall.dy,
			}))
		};
		console.log("ball y = ", ball.y);
		if (ball.y < grid) {
			setBall((prevBall) => ({
				...prevBall,
				dy: ballSpeed,
				y: grid,
			}));
		}
		else if (ball.y + grid > height - grid) {
			setBall((prevBall) => ({
				...prevBall,
				dy: -ballSpeed,
				y: height - grid * 2,
			}));
		}
		if (leftPaddle.y < grid) {
			setleftpaddle((prevPaddle) => ({
				...prevPaddle,
				y: grid,
			}));;
		}
		const gameLoop = setInterval(handleGameUpdate, 1000 / 60);

		return () => {
			clearInterval(gameLoop);
		};
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
		console.log("y =", leftPaddle.y);
		window.addEventListener('keydown', keyDownHandler);
		window.addEventListener('keyup', keyUpHandler);
		return () => {
			window.removeEventListener("keydown", keyDownHandler);
			window.removeEventListener("keyup", keyUpHandler);
		};
	}, [leftPaddle, ball]);

	return (
		<div>
			<Navigation />
			<h1 className='pong'>pong page</h1>
			<div className='pong'>
				<canvas ref={canvasRef} />
			</div>
		</div>
	);
};

export default Pong;