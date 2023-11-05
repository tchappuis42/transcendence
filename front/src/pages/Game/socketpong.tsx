import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import PongTest from "./Pong";
import GameScore from "./gameScore";
import MatchHistory from "./matchHistory";
import Ranking from "./gameRanking";

const SocketPong = () => {
	const socket = useSocket();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState("");
	const [player2, setplayer2] = useState("");
	const [search, setsearch] = useState("trouver un match")

	const [color, setColor] = useState({
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

	const paddleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColor({ ...color, paddle: event.target.value });
	}

	const ballChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColor({ ...color, ball: event.target.value });
	}

	const mapChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setColor({ ...color, map: event.target.value });
	}

	return (
		<div className="flex w-full h-19/20 p-4 sm:p-12">
			{!page &&
				<div className="flex h-full w-full flex-wrap justify-between align-between">
					<div className="bg-white h-1/2 w-3/5">
						<div className="">
							<button onClick={matchmaking} className="">
								{search}
							</button>
							<div>
								couleur de la raquette :
								<select name="paddleColor" style={{ backgroundColor: color.paddle, color: color.paddle }} onChange={paddleChange}>
									<option value="white" style={{ backgroundColor: 'white', color: 'white' }}>white</option>
									<option value="red" style={{ backgroundColor: 'red', color: 'red' }}>red</option>
									<option value="green" style={{ backgroundColor: 'green', color: 'green' }}>green</option>
								</select>
								{color.paddle}
							</div>
							<div>
								couleur de la balle :
								<select name="paddleColor" style={{ backgroundColor: color.ball, color: color.ball }} onChange={ballChange}>
									<option value="white" style={{ backgroundColor: 'white', color: 'white' }}>white</option>
									<option value="red" style={{ backgroundColor: 'red', color: 'red' }}>red</option>
									<option value="green" style={{ backgroundColor: 'green', color: 'green' }}>green</option>
								</select>
								{color.ball}
							</div>
							<div>
								couleur du terrain :
								<select name="paddleColor" style={{ backgroundColor: color.map, color: color.map }} onChange={mapChange}>
									<option value="black" style={{ backgroundColor: 'black', color: 'black' }}>black</option>
									<option value="gold" style={{ backgroundColor: 'gold', color: 'gold' }}>gold</option>
									<option value="silver" style={{ backgroundColor: 'silver', color: 'silver' }}>silver</option>
								</select>
								{color.map}
							</div>
						</div>
					</div>
					<Ranking />
					<div className="h-1/2 w-2/5 bg-gray-300"></div>
					<MatchHistory />
				</div >
			}
			{
				page &&
				<div className="w-full h-full flex items-center">
					<div className="relative flex flex-col items-center justify-center h-2/3 w-full sm:h-full pt-12">
						<div className="bg-white w-full h-1/6 min-[845px]:w-[750px] rounded-t-xl flex">
							<div className="w-1/2 flex">
								<img src="https://cdn.intra.42.fr/users/5078380b5384a3c1d0c13abb3b2e5522/tchappui.jpg" alt="" className="rounded-tl-xl h-full w-auto" />
								<div>
									<h1 className="text-2xl font-semibold pl-3 pt-2 sm:text-3xl sm:pl-4 sm:pt-4">{player1}</h1>
									<h2 className="text-xl pl-3 pt-2 sm:pl-4 sm:pt-4">score: 540</h2>
								</div>
							</div>
							<div className="w-1/2 flex flex-row-reverse">
								<img src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg" alt="" className="rounded-tr-xl h-full w-auto" />
								<div>
									<h1 className="text-2xl font-semibold pr-3 pt-2 sm:text-3xl sm:pr-4 sm:pt-4">{player2}</h1>
									<h2 className="text-xl pr-3 pt-2 sm:pr-4 sm:pt-4">score: 540</h2>
								</div>
							</div>
						</div>
						<PongTest color={color} />
						<GameScore SetPage={SetPage} />
					</div>
				</div>
			}
		</div >
	);
};

export default SocketPong;