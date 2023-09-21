import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';
import GameRules from './gamerules';
import { Ball, Game, Paddle } from './gameInterface';
import { drawBall, drawGame, drawMap, drawPaddle } from './drawfunctions';

const PongTest = () => {
	const socket = useSocket();
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const height = 585;
	const width = 750;
	const grid = 15;
	const paddleHeight = grid * 5; // 80

	const [ball, setBall] = useState<Ball>({
		x: 0,
		y: 0,
		width: 15,
		height: 15,
	})

	//console.log("la")
	const [leftPaddle, setleftpaddle] = useState<Paddle>({
		// start in the middle of the game on the left side
		x: (grid * 2) + 15,
		y: height / 2 - paddleHeight / 2,
		width: 1,
		height: paddleHeight,
		score: 0,
	});

	const [rightPaddle, setrightpaddle] = useState<Paddle>({
		// start in the middle of the game on the left side
		x: 750 - (grid * 3),
		y: 585 / 2 - paddleHeight / 2,
		width: 1,
		height: paddleHeight,
		score: 0,
	});

	const keyDownHandler = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "ArrowUp") {
				if (socket)
					socket.emit("paddle", "up")
			}
			if (e.key === "ArrowDown") {
				if (socket)
					socket.emit("paddle", "down")
			}
			if (e.key === "q") {
				if (socket)
					socket.emit("paddle", "q")
			}
		}, [socket])

	const keyUpHandler = useCallback(
		(e: KeyboardEvent) => {
			if (socket)
				socket.emit("paddle", "keyup")
		}, [socket])

	useEffect(() => {
		if (socket) {
			socket.on("life", (data) => {
				//console.log("data = ", data);  // -----> data ok
				setrightpaddle((prevState) => ({
					...prevState,
					y: data.playTwo,
					score: data.score2,
				}));
				setleftpaddle((prevState) => ({
					...prevState,
					y: data.playOne,
					score: data.score1,
				}));
				setBall((prevState) => ({ ...prevState, y: data.ballY, x: data.ballX }));
			});
		}
		return () => {
			if (socket) {
				socket.off("life");
			}
		};
	}, [socket]);

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
		drawGame(context, leftPaddle, rightPaddle);
		drawBall(context, ball);
		window.addEventListener('keydown', keyDownHandler);
		window.addEventListener('keyup', keyUpHandler);
		return () => {
			window.removeEventListener("keydown", keyDownHandler);
			window.removeEventListener("keyup", keyUpHandler);
		};
	}, [ball]);

	return (
		<div >
			<GameRules />
			<div id="pong" className='pong'>
				<canvas ref={canvasRef} />
			</div>
		</div>
	);
};

export default PongTest;