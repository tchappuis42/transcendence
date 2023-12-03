import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import PongTest from "./Pong";
import GameScore from "./gameScore";
import MatchHistory from "./matchHistory";
import Ranking from "./Ranking";
import PlayerCard from "./playerCard";
import { useAccount } from "../../ui/organisms/useAccount";
import Friends from "../Friend/component/Friends";

const SocketPong = () => {
	const { account } = useAccount()
	const socket = useSocket();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState(0);
	const [player2, setplayer2] = useState(0);
	const [search, setsearch] = useState("trouver un match")
	const [rules, setRules] = useState(false);
	console.log(socket)
	const [color, setColor] = useState({
		paddle: "white",
		ball: "white",
		map: "black"
	})

	useEffect(() => {
		socket?.emit("info")
	}, [])


	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				if (typeof data === 'object') {
					setplayer1(data.idOne);
					setplayer2(data.idTwo);
					setsearch("trouver un match");
					setRules(true)
					SetPage(true);
				}
				else {
					if (data === 1)
						setsearch("recherche de match")
					else if (data === 2)
						setsearch("trouver un match")
					else
						alert("vous etes deja en rechecher de partie")
				}
			});
			socket.on("info", (data) => {
				if (typeof data === 'object') {
					setplayer1(data.idOne);
					setplayer2(data.idTwo);
					SetPage(true);
					if (data.readyOne === false && data.idOne === account.id)
						setRules(true)
					if (data.readyTwo === false && data.idTwo === account.id)
						setRules(true)
				}
				else
					setsearch("recherche de match")
			});
			socket.on("status", (data) => {
				console.log("status = ", data)
			})
		}
		return () => {
			if (socket) {
				socket.off("info");
				socket.off("game");
			}
		};
	}, [socket]);

	const matchmaking = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("matchmaking");
		}
	};

	//debug
	const clean = (e: SyntheticEvent) => {
		e.preventDefault();

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
		<div className="flex justify-center">
			<div className="flex w-full p-3 sm:py-10 sm:px-10 xl:w-[1280px]">
				{!page &&
					<div className="flex w-full flex-col justify-between align-between sm:flex-wrap sm:flex-row">
						<div className="w-full h-60 p-4 rounded-3xl bg-black/50 sm:h-60 md:w-3/5 md:h-96 xl:w-[720px]">
							<div className="flex items-center justify-center h-36">
								<button onClick={matchmaking} className="border h-10 border-black px-2">
									{search}
								</button>
							</div>
							<div className="px-10 sm:px-14">
								<div className="flex justify-between">
									<h1>couleur de la raquette :</h1>
									<select name="paddleColor" className="w-20 hover:bg-black" style={{ backgroundColor: color.paddle, color: color.paddle }} onChange={paddleChange}>
										<option value="white" style={{ backgroundColor: 'white', color: 'white' }}>white</option>
										<option value="red" style={{ backgroundColor: 'red', color: 'red' }}>red</option>
										<option value="green" style={{ backgroundColor: 'green', color: 'green' }}>green</option>
									</select>
								</div>
								<div className="flex justify-between">
									couleur de la balle :
									<select name="paddleColor" className="w-20" style={{ backgroundColor: color.ball, color: color.ball }} onChange={ballChange}>
										<option value="white" style={{ backgroundColor: 'white', color: 'white' }}>white</option>
										<option value="red" style={{ backgroundColor: 'red', color: 'red' }}>red</option>
										<option value="green" style={{ backgroundColor: 'green', color: 'green' }}>green</option>
									</select>
								</div>
								<div className="flex justify-between">
									couleur du terrain :
									<select name="paddleColor" className="w-20" style={{ backgroundColor: color.map, color: color.map }} onChange={mapChange}>
										<option value="black" style={{ backgroundColor: 'black', color: 'black' }}>black</option>
										<option value="gold" style={{ backgroundColor: 'gold', color: 'gold' }}>gold</option>
										<option value="silver" style={{ backgroundColor: 'silver', color: 'silver' }}>silver</option>
									</select>
								</div>
							</div>
						</div>
						<div className="w-full h-40 mb-1 my-1 md:mt-0 bg-black/50 rounded-3xl sm:w-[49%] sm:my-1 sm:h-72 md:w-[39%] md:h-96 xl:w-[468px] p-2.5">
							<Ranking />
						</div>
						<div className="w-full h-40 mb-1 bg-black/50 rounded-3xl sm:w-1/2 sm:my-1 sm:h-72 md:w-2/5 md:h-80 xl:w-[480px] p-2.5">
							<Friends />
						</div>
						<div className="w-full h-40 mb-1 bg-black/50 rounded-3xl sm:my-1 sm:h-72 md:w-[59%] md:h-80 xl:w-[708px] p-2.5">
							<MatchHistory userId={account.id} />
						</div>
					</div>
				}
				{
					page &&
					<div className="w-full h-[52rem] flex items-center sm:h-[46rem] md:items-start">
						<div className="relative flex flex-col items-center justify-center w-full h-full pt-12">
							<PlayerCard idOne={player1} idTwo={player2} />
							<PongTest color={color} rules={rules} />
							<GameScore SetPage={SetPage} />
						</div>
					</div>
				}
				{/*<button onClick={clean}>clean</button>*/}
			</div >
		</div>
	);
};

export default SocketPong;