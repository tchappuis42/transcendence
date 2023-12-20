import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import PongTest from "./Pong";
import GameScore from "./gameScore";
import MatchHistory from "./matchHistory";
import Ranking from "./Ranking";
import PlayerCard from "./playerCard";
import { useAccount } from "../../ui/organisms/useAccount";
import Friends from "../Friend/component/Friends";
import Matchmaking from "./Matchmaking";

const SocketPong = () => {
	const { account } = useAccount()
	const socket = useSocket();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState(0);
	const [player2, setplayer2] = useState(0);
	const [rules, setRules] = useState(false);
	const [color, setColor] = useState({ //la ba et ici
		paddle: "white",
		ball: "white",
		map: "black"
	})
	const [search, setsearch] = useState("trouver un match")
	const [error, setError] = useState("");

	const matchmaking = (e: SyntheticEvent) => {
		e.preventDefault();

		setError("");
		if (socket) {
			socket.emit("matchmaking");
		}
	};


	useEffect(() => {
		socket?.emit("info")
	}, [])


	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				if (typeof data === 'object') {
					setplayer1(data.idOne);
					setplayer2(data.idTwo);
					setRules(true)
					SetPage(true);
				}
				if (typeof data === 'number') {
					if (data === 1)
						setsearch("recherche de match")
					else if (data === 2)
						setsearch("trouver un match")
					else
						setError("vous etes deja en rechecher de partie")
				}
			});
			socket.on("info", (data) => {
				if (typeof data === 'object' && data !== null) {
					console.log("data = ", data);
					setplayer1(data.idOne);
					setplayer2(data.idTwo);
					SetPage(true);
					if (data.readyOne === false && data.idOne === account.id)
						setRules(true)
					if (data.readyTwo === false && data.idTwo === account.id)
						setRules(true)
				}
				if (typeof data === 'number')
					setsearch("recherche de match")
			});
		}
		return () => {
			if (socket) {
				socket.off("info");
				socket.off("game");
			}
		};
	}, [socket]);

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

	//color et change serach
	return (
		<div className="flex justify-center">
			<div className="flex w-full p-3 sm:py-10 sm:px-10 xl:w-[1280px]">
				{!page &&
					<div className="flex w-full flex-col justify-between align-between md:flex-wrap md:flex-row">
						<div className="w-full h-96 rounded-md bg-black/50 md:w-3/5 md:h-96 xl:w-[720px] shadow-md shadow-white">
							<div className="bg-black/50 h-full w-full rounded-md">
								<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
									<h1>Matchmaking</h1>
								</div>
								<div className="flex flex-col items-center justify-center h-2/5 bg-white/50 m-2.5 rounded-xl">
									<button onClick={matchmaking} className="border h-10 border-black px-2 rounded-md">
										{search}
									</button>
									<h1 className="mt-3 text-red-600">{error}</h1>
								</div>
								<div className="px-10 sm:px-14 h-2/5 bg-white/50 m-2.5 rounded-xl py-2.5 flex flex-col justify-center">
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
						</div>
						<div className="w-full h-80 mb-1 my-1 md:mt-0 bg-black/50 rounded-md md:w-[39%] md:h-96 xl:w-[468px] shadow-md shadow-white">
							<Ranking />
						</div>
						<div className="w-full h-80 mb-1 mt-3 bg-black/50 rounded-3xl md:w-2/5 md:h-96 xl:w-[480px]">
							<Friends />
						</div>
						<div className="w-full h-80 mb-1 bg-black/50 mt-3 rounded-md md:w-[59%] md:h-96 xl:w-[708px] shadow-md shadow-white">
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
				<button onClick={clean}>clean</button>
			</div >
		</div>
	);
};

export default SocketPong;