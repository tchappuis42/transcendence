import axios from "axios";
import { stringify } from "querystring";
import { useEffect, useState } from "react";

interface cardProps {
	idOne: number,
	idTwo: number
}

interface player {
	username: string,
	score: number,
	avatar: string
}

const PlayerCard: React.FC<cardProps> = ({ idOne, idTwo }) => {

	const [playerOne, setPlayerOne] = useState<player>()
	const [playerTwo, setPlayerTwo] = useState<player>()

	useEffect(() => {
		const getInfoPlayerOne = async () => {
			try {
				const response = await axios.get(`/api/user/byId/${idOne}`);
				setPlayerOne(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des info player 1 :", error);
			}
		}
		const getInfoPlayerTwo = async () => {
			try {
				const response = await axios.get(`/api/user/byId/${idTwo}`);
				setPlayerTwo(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des info player 2 :", error);
			}
		}
		getInfoPlayerOne();
		getInfoPlayerTwo();
	}, []);

	return (
		<div className="bg-white w-full h-20 min-[920px]:w-[750px] rounded-t-xl flex sm:h-32">
			<div className="w-1/2 flex">
				<div className="w-[29%]">
					<img src={playerOne?.avatar} alt="" className="rounded-tl-xl w-full h-full scale-100 object-cover" />
				</div>
				<div>
					<h1 className="text-2xl font-semibold pl-3 pt-2 sm:text-3xl sm:pl-4 sm:pt-4">{playerOne?.username}</h1>
					<h2 className="text-xl pl-3 pt-2 sm:pl-4 sm:pt-4">score : {playerOne?.score}</h2>
				</div>
			</div>
			<div className="w-1/2 flex flex-row-reverse">
				<div className="w-[29%]">
					<img src={playerTwo?.avatar} alt="" className="rounded-tr-xl h-full w-full scale-100 object-cover" />
				</div>
				<div>
					<h1 className="text-2xl font-semibold pr-3 pt-2 sm:text-3xl sm:pr-4 sm:pt-4">{playerTwo?.username}</h1>
					<h2 className="text-xl pr-3 pt-2 sm:pr-4 sm:pt-4">score : {playerTwo?.score}</h2>
				</div>
			</div>
		</div>
	)
}

export default PlayerCard;