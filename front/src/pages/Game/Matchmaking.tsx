import { useSocket } from "../../ui/organisms/SocketContext";
import { SyntheticEvent, useEffect, useState } from "react";
import "../Chat/chat.css"
import "../Chat/component/card.css"
interface MatchmakingProps {
	color: {
		paddle: string;
		ball: string;
		map: string;
	};
	paddleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	ballChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	mapChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
	setPage: React.Dispatch<React.SetStateAction<boolean>>;
	setplayer1: React.Dispatch<React.SetStateAction<number>>;
	setplayer2: React.Dispatch<React.SetStateAction<number>>;
	setRules: React.Dispatch<React.SetStateAction<boolean>>;
}

const Matchmaking: React.FC<MatchmakingProps> = ({
	color,
	paddleChange,
	ballChange,
	mapChange,
	setPage,
	setplayer1,
	setplayer2,
	setRules,
}) => {
	const socket = useSocket();
	const [bonus, setBonus] = useState(false);
	const [search, setsearch] = useState("trouver un match")
	const [error, setError] = useState("");

	const matchmaking = (e: SyntheticEvent) => {
		e.preventDefault();

		setError("");
		if (socket) {
			socket.emit("matchmaking", bonus);
		}
	};

	const handleCheckBoxChange = () => {
		setBonus((prev) => !prev);
	}
	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				if (typeof data === 'object') {
					setplayer1(data.idOne);
					setplayer2(data.idTwo);
					setRules(true);
					setPage(true);
				}
				if (typeof data === 'number') {
					if (data === 1)
						setsearch("match search")
					else if (data === 2)
						setsearch("find a match")
					else
						setError("you're already looking for a game")
				}
			});
			socket.on("info", (data) => {
				if (typeof data === 'number')
					setsearch("match search")
			});
		}
		return () => {
			if (socket) {
				socket.off("info");
				socket.off("game");
			}
		};
	}, [socket]);

	return (
		<div className="w-full h-full min-h-[300px] col-span-2 rounded-md shadow bg-green-200">
			<div className="m-card">
				<div className='header-card'>
					<h1>Matchmaking</h1>
				</div>
				<div className="grid sm:grid-rows-2 md:grid-rows-1 md:grid-cols-2 px-4 py-4 bg-white/50 m-2.5 rounded gap-3">
					<div className="flex justify-center items-center">
						<button onClick={matchmaking} className="min-w-[180px] max-w-[200px] border h-10 border-black px-2 rounded">
							{search}
						</button>
					</div>
					<div className="flex justify-center items-center">
						<div className="flex jusitfy-center items-center items-center gap-3">
							<input type={"checkbox"} checked={bonus} className="border h-10 border-black rounded" onChange={handleCheckBoxChange}></input>
							{error ? (
								<h1 className="text-red-600">{error}</h1>
							) : (
								<h1 className="lg:text-sm xl:text-base">Activate Bonus Mode</h1>
							)}
						</div>
					</div>
				</div>
				<div className="grid grid-rows-3 px-10 sm:px-14 bg-white/50 m-2.5 rounded py-5 sm:py-5 md:py-8 gap-3 md:gap-6">
					<div className="flex justify-between gap-5 min-h-[40px]">
						<h1 className="w-full flex px-3 items-center border border-black/60 rounded" >racquet color :</h1>
						<select name="paddleColor" className="w-25 hover:bg-black border border-black/60 rounded" style={{ backgroundColor: color.paddle, color: color.paddle }} onChange={paddleChange}>
							<option value="white" className="bg-white text-white">white</option>
							<option value="red" className="bg-white text-white">red</option>
							<option value="green" className="bg-white text-white">green</option>
						</select>
					</div>
					<div className="flex justify-between gap-5">
						<h1 className="w-full flex px-3 items-center border border-black/60 rounded" >ball color :</h1>
						<select name="paddleColor" className="w-25 border border-black/60 rounded" style={{ backgroundColor: color.ball, color: color.ball }} onChange={ballChange}>
							<option value="white" className="bg-white text-white">white</option>
							<option value="red" className="bg-white text-white">red</option>
							<option value="green" className="bg-white text-white">green</option>
						</select>
					</div>
					<div className="flex justify-between gap-5">
						<h1 className="w-full flex px-3 items-center border border-black/60 rounded" > field color :</h1>
						<select name="paddleColor" className="w-25 border border-black/60 rounded" style={{ backgroundColor: color.map, color: color.map }} onChange={mapChange}>
							<option value="black" className="bg-white text-white">black</option>
							<option value="gold" className="bg-white text-white">gold</option>
							<option value="silver" className="bg-white text-white">silver</option>
						</select>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Matchmaking;