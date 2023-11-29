import { useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";

const GameRules = () => {
	const socket = useSocket();
	const [rules, setRules] = useState(true)
	const Rules = () => {
		setRules(false)
		if (socket)
			socket.emit("action", "ready")
	};

	return <div>
		{rules &&
			<div className="absolute inset-0 flex pt-8 justify-center">
				<div className='text-center w-96 h-80 bg-gray-200 sm:w-[30rem] sm:h-96 md:w-[38rem] md:h-[30rem]' >
					<h1 className="font-bold pt-8 text-3xl sm:text-4xl sm:pt-10 md:text-5xl md:pt-12">Règles du jeu</h1>
					<h2 className="pt-8 text-lg sm:text-xl sm:pt-10 md:text-2xl md:pt-12">controler votre raquette avec [w , s] ou [↑ ,  ↓]</h2>
					<h2 className="text-lg sm:text-xl md:text-2xl">le premier joueur a dix points gagne la partie</h2>
					<h2 className="text-lg sm:text-xl md:text-2xl">le score est calculer </h2>
					<h2 className="py-6 text-lg sm:text-xl sm:py-8 md:text-2xl md:py-10">appuyer sur Ready pour commencer</h2>
					<span className="text-2xl hover:font-semibold cursor-pointer hover:text-red-600 sm:text-3xl md:text-4xl" onClick={Rules}>Ready</span>
				</div>
			</div>
		}
	</div>
};
export default GameRules;