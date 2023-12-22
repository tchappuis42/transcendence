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
		<div className="main-page">
			<div className="main-component">
				<div className="m-card">
					<div className='header-card'>
						<h1>Matchmaking</h1>
					</div>
					<div className="flex flex-col items-center justify-center h-2/5 bg-white/50 m-2.5 rounded-xl">
						<button onClick={matchmaking} className="border h-10 border-black px-2 rounded-md">
							{search}
						</button>
						<div className=" w-2/6 min-w-[200px] flex justify-around border-2 border-black p-2 rounded border-dashed ">
							<input type={"checkbox"} checked={bonus} className="w-6 rounded-full" onChange={handleCheckBoxChange}>
							</input>
							<h1 className=" ">Activate Bonus Mode</h1>
						</div>
						<h1 className="mt-3 text-red-600">{error}</h1>
					</div>
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
	)
}

export default Matchmaking;