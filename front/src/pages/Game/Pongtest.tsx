import React, { useRef, useEffect, useState } from 'react';
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

	function collides(obj1: Ball, obj2: Paddle) {
		return obj1.x < obj2.x + obj2.width &&
			obj1.x + obj1.width > obj2.x &&
			obj1.y < obj2.y + obj2.height &&
			obj1.y + obj1.height > obj2.y;
	}

	const keyDownHandler = (e: KeyboardEvent) => {
		if (e.key === "w") {
			setleftpaddle({ ...leftPaddle, dy: -paddleSpeed })
		}
		if (e.key === "s") {
			setleftpaddle({ ...leftPaddle, dy: paddleSpeed })
		}
		if (e.key === "ArrowUp") {
			if (socket)
				socket.emit("paddle", "up")
			//setrightpaddle({ ...rightPaddle, dy: -paddleSpeed })
		}
		if (e.key === "ArrowDown") {
			if (socket)
				socket.emit("paddle", "down")
			//setrightpaddle({ ...rightPaddle, dy: paddleSpeed })
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
		//	if (e.key === "ArrowUp" && rightPaddle.dy < 0) {
		if (socket)
			socket.emit("paddle", "keyup")
		//setrightpaddle({ ...rightPaddle, dy: 0 })
		//}
		//if (e.key === "ArrowDown" && rightPaddle.dy > 0) {
		if (socket)
			socket.emit("paddle", "keyup")
		//setrightpaddle({ ...rightPaddle, dy: 0 })
		//	}
	}

	useEffect(() => {
		if (socket) {
			socket.on("life", (data) => {
				console.log("data = ", data.playTwo);  // -----> data ok
				setrightpaddle({ ...rightPaddle, y: data.playTwo })
				setleftpaddle({ ...leftPaddle, y: data.playOne })
				/*if (data === "up")
					setrightpaddle({ ...rightPaddle, dy: -paddleSpeed })
				if (data === "down")
					setrightpaddle({ ...rightPaddle, dy: paddleSpeed })
				if (data === "fup")
					setrightpaddle({ ...rightPaddle, dy: 0 })
				if (data === "fdown")
					setrightpaddle({ ...rightPaddle, dy: 0 })*/
			});
		}
		return () => {
			if (socket) {
				socket.off("life");
			}
		};
	}, [socket]);

	const paddlelogic = () => {
		//left paddle logic

		/*if (leftPaddle.y < grid) {
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
		}*/
		//rightpaddle logic
		/*if (rightPaddle.y < grid) {
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
		}*/
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
			//setleftpaddle({ ...leftPaddle, color: leftPaddle.color + 1 })
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
		//	console.log("ball.dx = ", ball.dx);
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
			if (ball.dx > -8) {
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

	/*useEffect(() => {
		//if (gameInfo.start == true) {
		const handleGameUpdate = () => {
			//console.log(rightPaddle.y)
			/*setleftpaddle((prevPaddle) => ({
				...prevPaddle,
				y: prevPaddle.y + prevPaddle.dy
			}));
			/*setrightpaddle((prevPaddle) => ({
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
		const gameLoop = setInterval(handleGameUpdate, 1000 / 70);
		return () => {
			clearInterval(gameLoop);
		};
		//}
	}, [rightPaddle]);*/


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
			<GameRules />
			<div id="pong" className='pong'>
				<canvas ref={canvasRef} />
			</div>
		</div>
	);
};

export default PongTest;