import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import PongTest from "./Pong";
import GameScore from "./gameScore";
import MatchHistory from "./matchHistory";
import Ranking from "./gameRanking";

interface ColourOption {
	value: string;
	label: string;
	color: string;
	isFixed?: boolean;
	isDisabled?: boolean;
}

const SocketPong = () => {
	const socket = useSocket();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState("");
	const [player2, setplayer2] = useState("");
	const [search, setsearch] = useState("trouver un match")

	const [Color, setColor] = useState({
		paddle: "white",
		ball: "white",
		map: "black"
	})


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

	const colourOptions: ColourOption[] = [
		{ value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
		{ value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
		{ value: 'purple', label: 'Purple', color: '#5243AA' },
		{ value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
		{ value: 'orange', label: 'Orange', color: '#FF8B00' },
		{ value: 'yellow', label: 'Yellow', color: '#FFC400' },
		{ value: 'green', label: 'Green', color: '#36B37E' },
		{ value: 'forest', label: 'Forest', color: '#00875A' },
		{ value: 'slate', label: 'Slate', color: '#253858' },
		{ value: 'silver', label: 'Silver', color: '#666666' },
	];

	return (
		<div className="divpong">
			{!page &&
				<div className="container">
					<div className="box">
						<button onClick={matchmaking} className="box1">
							{search}
						</button>
						<select
							name="paddleColor"
							defaultValue={colourOptions[0]}
							options={colourOptions}
						/>
					</div>
					<Ranking />
					<MatchHistory />
					<div className="box"></div>
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