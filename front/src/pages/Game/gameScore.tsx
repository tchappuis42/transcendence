import { useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";

type props = {
	SetPage: (bool: boolean) => void
}

const GameScore = ({ SetPage }: props) => {

	const socket = useSocket();
	const [score, setScore] = useState("")

	const Page = () => {
		SetPage(false);
	}

	useEffect(() => {
		if (socket) {
			socket.on("score", (data) => {
				console.log("kevin = ", data);  // -----> data ok
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
				<span onClick={Page}>retourner a la page de jeu</span>
			</div>
		}
	</div>
};

export default GameScore;