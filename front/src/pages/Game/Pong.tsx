import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';
import GameRules from './gamerules';
import { Ball, Paddle } from './gameInterface';
import { drawBall, drawMap, drawPaddle } from './drawfunctions';
import GameScore from './gameScore';

interface PongProps {
	color: {
		paddle: string,
		ball: string,
		map: string
	};
	rules: boolean;
}

const PongTest: React.FC<PongProps> = ({ color, rules }) => {
	const socket = useSocket();
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const height = 585;
	const width = 750;
	const grid = 15;
	const paddleHeight = grid * 5;
	let i = 0;

	const [ball, setBall] = useState<Ball>({
		x: 0,
		y: 0,
		width: 15,
		height: 15,
	})

	const [leftPaddle, setleftpaddle] = useState<Paddle>({
		x: (grid * 2),
		y: height / 2 - paddleHeight / 2,
		width: 15,
		height: paddleHeight,
		score: 0,
	});

	const [rightPaddle, setrightpaddle] = useState<Paddle>({
		x: 750 - (grid * 3),
		y: 585 / 2 - paddleHeight / 2,
		width: 15,
		height: paddleHeight,
		score: 0,
	});

	const keyDownHandler = useCallback(
		(e: KeyboardEvent) => {
			e.preventDefault();
			if (e.key === "ArrowUp" || e.key === "w") {
				if (socket)
					socket.emit("action", "up")
			}
			if (e.key === "ArrowDown" || e.key === "s") {
				if (socket)
					socket.emit("action", "down")
			}

			//debug
			if (e.key === "q") {
				if (socket)
					socket.emit("action", "q")
			}
		}, [socket])

	const keyUpHandler = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "ArrowUp" || e.key === "w") {
				if (socket)
					socket.emit("action", "keyup")
			}
			if (e.key === "ArrowDown" || e.key === "s") {
				if (socket)
					socket.emit("action", "keydown")
			}
		}, [socket])



	useEffect(() => {
		if (socket) {
			socket.on("life", (data) => {
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
		drawMap(context, canvas, color.map);
		drawPaddle(context, leftPaddle, rightPaddle, color.paddle);
		drawBall(context, ball, color.ball);
		window.addEventListener('keydown', keyDownHandler);
		window.addEventListener('keyup', keyUpHandler);
		return () => {
			window.removeEventListener("keydown", keyDownHandler);
			window.removeEventListener("keyup", keyUpHandler);
		};
	}, []);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas)
			return;
		const context = canvasRef.current?.getContext("2d");
		if (!context)
			return;
		drawMap(context, canvas, color.map);
		drawPaddle(context, leftPaddle, rightPaddle, color.paddle);
		drawBall(context, ball, color.ball);
	}, [ball]);

	return (
		<div className='relative h-[35rem] flex w-full justify-center'>
			{rules &&
				<GameRules />}
			<div id="pong" >
				<canvas ref={canvasRef} className='max-w-full h-auto block m-0' />
			</div>
		</div>
	);
};

export default PongTest;