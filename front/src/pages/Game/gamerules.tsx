import { useState, useEffect } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";

const GameRules = () => {
	const socket = useSocket();
	const [rules, setRules] = useState(true)
	const [countDown, setCountDown] = useState(60);

	const Rules = () => {
		setRules(false)
		if (socket)
			socket.emit("action", "ready")
	};

	useEffect(() => {
		const intervalId = setInterval(() => {
		  setCountDown((prev : number) => prev - 1);
		}, 1000);
		if (countDown === 0) {
		  clearInterval(intervalId);
		}
		return () => clearInterval(intervalId);
	  }, [countDown]);
	  
	return <div>
		{rules &&
			<div className="absolute inset-0 flex pt-8 justify-center">
				<div className='text-center w-96 h-80 bg-gray-200 sm:w-[30rem] sm:h-96 md:w-[38rem] md:h-[30rem]' >
					<h1 className="font-bold pt-8 text-3xl sm:text-4xl sm:pt-10 md:text-5xl md:pt-12">Game rules</h1>
					<h2 className="pt-8 text-lg sm:text-xl sm:pt-10 md:text-2xl md:pt-12">Controler the racquet [w , s] or [↑ ,  ↓]</h2>
					<h2 className="text-lg sm:text-xl md:text-2xl">The first player to reach ten points wins the game</h2>
					<h2 className="py-6 text-lg sm:text-xl sm:py-8 md:text-2xl md:py-10">Press Ready to start</h2>
					<span className="text-2xl hover:font-semibold cursor-pointer hover:text-red-600 sm:text-3xl md:text-4xl" onClick={Rules}>Ready</span>
					<h1>{countDown}</h1>
				</div>
			</div>
		}
	</div>
};
export default GameRules;