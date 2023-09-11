import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import { useAccount } from "../../ui/organisms/useAccount";

const SocketPong = () => {
	const socket = useSocket();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState("");
	const [player2, setplayer2] = useState("");
	const [score1, setscore1] = useState(0);
	const [score2, setscore2] = useState(0);
	const { account } = useAccount()


	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				console.log(data);  // -----> data ok
				console.log("data user = ", data.player1.username) // -----> user ok : lalala
				setplayer1(data.player1.username);
				setplayer2(data.player2.username);
				console.log("account = ", account.username) // -----> ok
				console.log("la il egal a ", player1) // ----> pas ok : player1 = ""
				setPage(true);
			});
			socket.on("gamelife", (data) => {
				console.log("player1 = ", player1)
				if (data === player1) {
					setscore1(prevscore => prevscore + 1);
					console.log(data)
				}
				else
					setscore2(prevscore => prevscore + 1);
			});
		}
		return () => {
			if (socket) {
				socket.off("game");
				socket.off("gamelife");
			}
		};
	}, [socket]);

	const matchmaking = (e: SyntheticEvent) => {
		e.preventDefault();

		console.log("matchmaking");
		if (socket) {
			socket.emit("matchmaking");
		}
	};

	const incrementScore = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("gamelife");
		}
	};

	const clean = (e: SyntheticEvent) => {
		e.preventDefault();

		console.log("clean");
		if (socket) {
			socket.emit("clean");
			setPage(false)
		}
		setscore1(0);
		setscore2(0);
	};

	return (
		<div className="signup">
			{!page &&
				<button onClick={matchmaking} className="button">
					trouver un match
				</button>
			}
			{page &&
				<div className="text">
					<div>{player1} vs {player2}</div>
					{score1} - {score2}
					<button onClick={incrementScore}>+1</button>
				</div>
			}
			<button onClick={clean}>clean</button>
		</div>
	);
};

export default SocketPong;