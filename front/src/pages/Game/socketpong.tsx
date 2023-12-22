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
	// w-full md:flex-wrap md:flex-row 
	return (
		<div className="h-full lg:h-screen lg:pb-[200px] sm:px-10 md:px-20 lg:px-30 xl:px-40 2xl:px-80">
			{!page &&
				<div className="main-component grid grid-rows-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4" style={{gridTemplate: "repeat(6, minmax(0, 1fr))"}}>
					<Matchmaking color={color} paddleChange={paddleChange} ballChange={ballChange} mapChange={mapChange} />
					{/* <div className="w-full h-full min-h-[300px] col-span-2 rounded-md shadow bg-green-200"> */}
						{/* <div className="m-card h-full"> */}	
							{/* <div className='header-card'>
								<h1>Matchmaking</h1>
							</div>
							
							<div className="grid grid-cols-4 px-14 items-center justify-left h-1/5 bg-white/50 m-2.5 rounded">
								<button onClick={matchmaking} className="min-w-[150px] border h-10 border-black px-2 rounded">
									{search}
								</button>
								<h1 className="mt-3 text-red-600">{error}</h1>
							</div>
							<div className="px-10 sm:px-14 h-3/5 bg-white/50 m-2.5 rounded py-14 grid grid-rows-3 gap-5">
								<div className="flex justify-between gap-5">
									<h1 className="w-full flex px-3 items-center border border-black/60 rounded" >couleur de la raquette :</h1>
									<select name="paddleColor" className="w-25 hover:bg-black border border-black/60 rounded" style={{ backgroundColor: color.paddle, color: color.paddle }} onChange={paddleChange}>
										<option value="white" className="bg-white text-white">white</option>
										<option value="red" className="bg-white text-white">red</option>
										<option value="green" className="bg-white text-white">green</option>
									</select>
								</div>
								<div className="flex justify-between gap-5">
									<h1 className="w-full flex px-3 items-center border border-black/60 rounded" >couleur de la balle :</h1>
									<select name="paddleColor" className="w-25 border border-black/60 rounded" style={{ backgroundColor: color.ball, color: color.ball }} onChange={ballChange}>
										<option value="white" className="bg-white text-white">white</option>
										<option value="red" className="bg-white text-white">red</option>
										<option value="green" className="bg-white text-white">green</option>
									</select>
								</div>
								<div className="flex justify-between gap-5">
									<h1 className="w-full flex px-3 items-center border border-black/60 rounded" > couleur du terrain :</h1>
									<select name="paddleColor" className="w-25 border border-black/60 rounded" style={{ backgroundColor: color.map, color: color.map }} onChange={mapChange}>
										<option value="black" className="bg-white text-white">black</option>
										<option value="gold" className="bg-white text-white">gold</option>
										<option value="silver" className="bg-white text-white">silver</option>
									</select>
								</div>
							</div> */}
						{/* </div> */}
					{/* </div> */}
					<div className="min-h-[300px] row-span-1 col-span-2">
						<Ranking />
					</div>
					<div className="min-h-[300px] row-span-1 col-span-2">
						<MatchHistory userId={account.id} />
					</div>
					<div className="min-h-[300px] row-span-1 col-span-2">
						<Friends />
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
			{/* <button onClick={clean}>clean</button> */}
		</div >
	);
};

export default SocketPong;