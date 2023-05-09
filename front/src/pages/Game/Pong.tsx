import Navigation from '../../components/Navigation';
import { useRef, useEffect } from 'react';

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

const Pong = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const grid = 15;
	const paddleHeight = grid * 5; // 80
	const maxPaddleY = 585 - grid - paddleHeight;

	const leftPaddleRef = useRef<Paddle>({
		// start in the middle of the game on the left side
		x: grid * 2,
		y: 0,
		width: grid,
		height: paddleHeight,

		// paddle velocity
		dy: 0
	});

	const rightPaddleRef = useRef<Paddle>({
		// start in the middle of the game on the left side
		x: 0,
		y: 0,
		width: grid,
		height: paddleHeight,

		// paddle velocity
		dy: 0
	});

	const gameInfoRef = useRef<Game>({
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

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas)
			return;
		canvas.width = 750;
		canvas.height = 585;
		canvas.id = "pong";
		const context = canvas.getContext("2d");
		if (!context)
			return;
		const leftPaddle = leftPaddleRef.current;
		leftPaddle.y = canvas.height / 2 - paddleHeight / 2;
		const rightPaddle = rightPaddleRef.current;
		rightPaddle.x = canvas.width - grid * 3;
		rightPaddle.y = canvas.height / 2 - paddleHeight / 2;
		const gameInfo = gameInfoRef.current;
		drawMap(context, canvas);
		drawPaddle(context, leftPaddle, rightPaddle);
		drawGame(context, gameInfo);
	}, [])

	return (
		<div>
			<Navigation />
			<h1>pong page</h1>
			<canvas ref={canvasRef} />
		</div>
	);
};

export default Pong;