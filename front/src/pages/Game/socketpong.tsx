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

	useEffect(() => {
		socket?.emit("info")
	}, [])


	useEffect(() => {
		if (socket) {
			socket.on("info", (data) => {
				if (typeof data === 'object' && data !== null) {
					setplayer1(data.idOne);
					setplayer2(data.idTwo);
					setPage(true);
					if (data.readyOne === false && data.idOne === account.id)
						setRules(true)
					if (data.readyTwo === false && data.idTwo === account.id)
						setRules(true)
				}
			});
		}
		return () => {
			if (socket) {
				socket.off("info");
				socket.off("game");
			}
		};
	}, [socket]);

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
				<div className="main-component grid grid-rows-2 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4" style={{ gridTemplate: "repeat(6, minmax(0, 1fr))" }}>
					<Matchmaking color={color} paddleChange={paddleChange} ballChange={ballChange} mapChange={mapChange} setPage={setPage} setplayer1={setplayer1} setplayer2={setplayer2} setRules={setRules} />
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
						<GameScore SetPage={setPage} />
					</div>
				</div>
			}
		</div >
	);
};

export default SocketPong;