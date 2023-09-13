import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import PongTest from "./Pongtest";

const SocketPong = () => {
	const socket = useSocket();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState("");
	const [player2, setplayer2] = useState("");
	const [score1, setscore1] = useState(0);
	const [score2, setscore2] = useState(0);
	const [search, setsearch] = useState("trouver un match")

	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				if (typeof data === 'object') {
					setplayer1(data.player1.username);
					setplayer2(data.player2.username);
					setPage(true);
				}
				else {
					if (data === "recherche de partie")
						setsearch("recherche de match")
					else if (data === "fin de la recherche de partie")
						setsearch("trouver un match")
					else
						alert(data)
				}
			});
		}
		return () => {
			if (socket) {
				socket.off("game");
			}
		};
	}, [socket, search]);

	useEffect(() => {
		if (socket) {
			socket.on("gamelife", (data) => {
				console.log("player1 = ", player1)
				console.log(data)
				if (data === player1) {
					setscore1(prevscore => prevscore + 1);

				}
				else if (data === player2)
					setscore2(prevscore => prevscore + 1);
			});
		}
		return () => {
			if (socket) {
				socket.off("gamelife");
			}
		};
	}, [socket, player1, player2]);

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
		<div className="divpong">
			{!page &&
				<div>
					<button onClick={matchmaking} className="button">
						{search}
					</button>
					<button onClick={clean}>clean</button>
				</div>
			}
			{page &&
				<div>
					<div className="players">
						<div className="player">{player1}</div>
						<div className="player">{player2}</div>
					</div>
					<div className="players">
						<div className="player">{score1}</div>
						<div className="player">{score2}</div>
					</div>
					<button onClick={incrementScore}>+1</button>
					<PongTest />
					<button onClick={clean}>clean</button>
				</div>
			}
		</div>
	);
};

export default SocketPong;