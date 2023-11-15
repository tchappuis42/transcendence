import { stringify } from "querystring";
import { useState } from "react";

interface cardProps {
	idOne: number,
	idTwo: number
}

const PlayerCard: React.FC<cardProps> = ({ idOne, idTwo }) => {

	const [playerOne, setPlayerOne] = useState(null)
	const [playerTwo, setPlayerTwo] = useState(null)

	return (
		<div className="bg-white w-full h-20 min-[845px]:w-[750px] rounded-t-xl flex sm:h-32">
			<div className="w-1/2 flex">
				<img src="https://cdn.intra.42.fr/users/5078380b5384a3c1d0c13abb3b2e5522/tchappui.jpg" alt="" className="rounded-tl-xl w-auto" />
				<div>
					<h1 className="text-2xl font-semibold pl-3 pt-2 sm:text-3xl sm:pl-4 sm:pt-4"></h1>
					<h2 className="text-xl pl-3 pt-2 sm:pl-4 sm:pt-4">score: 540</h2>
				</div>
			</div>
			<div className="w-1/2 flex flex-row-reverse">
				<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" className="rounded-tr-xl h-full w-auto" />
				<div>
					<h1 className="text-2xl font-semibold pr-3 pt-2 sm:text-3xl sm:pr-4 sm:pt-4"></h1>
					<h2 className="text-xl pr-3 pt-2 sm:pr-4 sm:pt-4">score: 540</h2>
				</div>
			</div>
		</div>
	)
}

export default PlayerCard;