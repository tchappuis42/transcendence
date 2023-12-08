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
	const [search, setsearch] = useState("trouver un match")
	const [rules, setRules] = useState(false);
	const [color, setColor] = useState({ //la ba et ici
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
							<Matchmaking
								search={search}
								color={color}
								paddleChange={paddleChange}
								ballChange={ballChange}
								mapChange={mapChange}
							/>
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
				{/*<button onClick={clean}>clean</button>*/}
			</div >
		</div>
	);
};

export default SocketPong;