import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';
import GameRules from './gamerules';
import { Ball, Paddle } from './gameInterface';
import { drawBall, drawMap, drawPaddle } from './drawfunctions';
import GameScore from './gameScore';

interface colorProps {
	color: {
		paddle: string,
		ball: string,
		map: string
	}
}

const PongTest = ({ color }: colorProps) => {
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

	//console.log("la")
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

	/*const [lastGameInfo, setLastGameInfo] = useState<{ playTwo: number, playOne: number, score2: number, score1: number, ballY: number, ballX: number }>({
		playOne: 0,
		playTwo: 0,
		score1: 0,
		score2: 0,
		ballX: 0,
		ballY: 0
	});*/

	const keyDownHandler = useCallback(
		(e: KeyboardEvent) => {
			e.preventDefault();
			if (e.key === "ArrowUp") {
				if (socket)
					socket.emit("action", "up")
			}
			if (e.key === "ArrowDown") {
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
			if (e.key === "ArrowUp") {
				if (socket)
					socket.emit("action", "keyup")
			}
			if (e.key === "ArrowDown") {
				if (socket)
					socket.emit("action", "keydown")
			}
		}, [socket])



	useEffect(() => {
		if (socket) {
			socket.on("life", (data) => {
				console.log("data = ", data);  // -----> data ok
				//setInfo(data)
				/*setLastGameInfo((prevState) => ({
					...prevState,
					playOne: data.playOne,
					playTwo: data.playTwo,
					score1: data.score1,
					score2: data.score2,
					ballX: data.ballX,
					ballY: data.ballY
				}));
				console.log(lastGameInfo)*/
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


	/*
		const draw = useCallback(() => {
			console.log("LA = ", lastGameInfo)
			if (!lastGameInfo || lastGameInfo === undefined)
				return;
			setrightpaddle((prevState) => ({
				...prevState,
				y: lastGameInfo.playTwo,
				score: lastGameInfo.score2,
			}));
			setleftpaddle((prevState) => ({
				...prevState,
				y: lastGameInfo.playOne,
				score: lastGameInfo.score1,
			}));
			setBall((prevState) => ({ ...prevState, y: lastGameInfo.ballY, x: lastGameInfo.ballX }));
		}, [ball, leftPaddle, rightPaddle, lastGameInfo])
	
		const timerGameLoop = useRef<NodeJS.Timer>()
	
		useEffect(() => {
	
			timerGameLoop.current = setInterval(draw, 1000 / 30)
			return () => {
				clearInterval(timerGameLoop.current);
			}
		}, []);*/

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
		<div >
			<GameRules />
			<div id="pong" className='pong'>
				<canvas ref={canvasRef} />
			</div>
		</div>
	);
};

export default PongTest;