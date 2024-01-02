import { useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";

type props = {
	SetPage: React.Dispatch<React.SetStateAction<boolean>>
}

const GameScore = ({ SetPage }: props) => {

	const socket = useSocket();
	const [score, setScore] = useState("")

	const Page = () => {
		SetPage(false);
	}

	useEffect(() => {
		if (socket) {
			socket.on("score", (data) => {
				setScore(data);
			});
		}
		return () => {
			if (socket) {
				socket.off("score");
			}
		};
	}, [socket]);

	return <div>
		{score &&
			<div className="absolute inset-0 flex items-center justify-center">
				<div className='bg-white h-40 w-64 text-center py-6 sm:h-60 sm:w-[24rem] md:h-72 md:w-[30rem]'>
					<h1 className="font-bold text-2xl py-6 sm:text-4xl sm:py-12 md:text-5xl md:py-16"> {score} </h1>
					<span className="hover:font-semibold cursor-pointer hover:text-red-600 sm:text-xl md:text-2xl" onClick={Page}>return to the game page</span>
				</div>
			</div>
		}
	</div>
};

export default GameScore;