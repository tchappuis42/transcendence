import React from 'react';
import Navigation from '../../components/Navigation';
import { useRef, useEffect } from 'react';
import { deflateRaw } from 'zlib';
import { isContext } from 'vm';

const Pong = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const grid = 15;
	const paddleHeight = grid * 5; // 80
	const maxPaddleY = 585 - grid - paddleHeight;

	const draw = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
		// draw score
		context.fillStyle = 'white';
		context.font = "30px Arial"
		context.fillText(game.score_left, 650, 70);
		context.fillText(game.score_right, 100, 70);

		// draw paddles
		context.fillStyle = 'white';
		context.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
		context.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

		// draw walls
		context.fillStyle = 'lightgrey';
		context.fillRect(0, 0, canvas.width, grid);
		context.fillRect(0, canvas.height - grid, canvas.width, canvas.height);

		// draw dotted line down the middle
		for (let i = grid; i < canvas.height - grid; i += grid * 2) {
			context.fillRect(canvas.width / 2 - grid / 2, i, grid, grid);
		}
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
		draw(context, canvas);
	}, [draw]);

	return (
		<div>
			<Navigation />
			<h1>pong page</h1>
			<canvas ref={canvasRef} />;
		</div>
	);
};

export default Pong;