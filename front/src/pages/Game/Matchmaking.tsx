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
}

const Matchmaking: React.FC<MatchmakingProps> = ({
	color,
	paddleChange,
	ballChange,
	mapChange
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

				console.log("data rep = ", data)
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

	return (
			<div className="w-full h-full min-h-[300px] col-span-2 rounded-md shadow bg-green-200">
				<div className="m-card">
					<div className='header-card'>
						<h1>Matchmaking</h1>
					</div>
					<div className="flex flex-col items-center justify-center h-2/5  bg-red-200 m-2.5 rounded-xl">
						<div className="grid grid-cols-4 px-14 items-center justify-left h-1/5 bg-white/50 m-2.5 rounded">
							<button onClick={matchmaking} className="min-w-[150px] border h-10 border-black px-2 rounded">
								{search}
							</button>
							<input type={"checkbox"} checked={bonus} className="min-w-[150px] border h-10 border-black px-2 rounded" onChange={handleCheckBoxChange}></input>
							<h1 className=" ">Activate Bonus Mode</h1>
							<h1 className="mt-3 text-red-600">{error}</h1>
						</div>
						{/* <button onClick={matchmaking} className="border h-10 border-black px-2 rounded-md">
							{search}
						</button>
						<div className=" w-2/6 min-w-[200px] flex justify-around border-2 border-black p-2 rounded border-dashed ">
							<input type={"checkbox"} checked={bonus} className="w-6 rounded-full" onChange={handleCheckBoxChange}>
							</input>
							<h1 className=" ">Activate Bonus Mode</h1>
						</div>
						<h1 className="mt-3 text-red-600">{error}</h1> */}
					</div>
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
				</div>
			</div>
	)
}

export default Matchmaking;