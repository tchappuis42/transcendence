import { useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";

const GameScore = () => {

	const socket = useSocket();
	const [score, setScore] = useState("")

	const Score = () => {

	}

	useEffect(() => {
		if (socket) {
			socket.on("score", (data) => {
				console.log("data = ", data);  // -----> data ok
				setScore(data);
			});
		}
		return () => {
			if (socket) {
				socket.off("score");
			}
		};
	}, [socket]);

	return <div>
		{score &&
			<div className='rules'>
				<h1> {score} </h1>
				<span onClick={Score}>retourner a la page de jeu</span>
			</div>
		}
	</div>
};

export default GameScore;