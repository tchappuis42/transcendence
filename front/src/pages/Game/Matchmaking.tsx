import { useSocket } from "../../ui/organisms/SocketContext";
import { SyntheticEvent, useEffect, useState } from "react";

interface MatchmakingProps {
	search: string;
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
	search,
	color,
	paddleChange,
	ballChange,
	mapChange
}) => {
	const socket = useSocket();


	const matchmaking = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("matchmaking");
		}
	};

	return (
		<div className="bg-black/50 h-full w-full rounded-md">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Matchmaking</h1>
			</div>
			<div className="flex items-center justify-center h-2/5 bg-white/50 m-2.5 rounded-xl">
				<button onClick={matchmaking} className="border h-10 border-black px-2 rounded-md">
					{search}
				</button>
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
	)
}

export default Matchmaking;