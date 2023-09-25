import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import PongTest from "./Pongtest";
import GameScore from "./gameScore";

const SocketPong = () => {
	const socket = useSocket();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState("");
	const [player2, setplayer2] = useState("");
	const [search, setsearch] = useState("trouver un match")

	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				if (typeof data === 'object') {
					setplayer1(data.player1.username);
					setplayer2(data.player2.username);
					setsearch("trouver un match");
					SetPage(true);
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

	const matchmaking = (e: SyntheticEvent) => {
		e.preventDefault();

		console.log("matchmaking");
		if (socket) {
			socket.emit("matchmaking");
		}
	};

	//debug
	const clean = (e: SyntheticEvent) => {
		e.preventDefault();

		console.log("clean");
		if (socket) {
			socket.emit("clean");
			setPage(false)
		}
	};

	const SetPage = (bool: boolean) => {
		setPage(bool);
	}

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
					<GameScore SetPage={SetPage} />
					<PongTest />
					<button onClick={clean}>clean</button>
				</div>
			}
		</div>
	);
};

export default SocketPong;