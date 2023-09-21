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

	//console.log("la")
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
				setrightpaddle((prevState) => ({ ...prevState, y: data.playTwo }));
				setleftpaddle((prevState) => ({ ...prevState, y: data.playOne }));
				setBall((prevState) => ({ ...prevState, y: data.ballY, x: data.ballX }));
				setGameinfo((prevState) => ({
					...prevState,
					score_left: data.score1,
					score_right: data.score2,
				}));
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
		drawGame(context, gameInfo);
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