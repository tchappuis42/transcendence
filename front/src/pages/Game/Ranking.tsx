import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "../../ui/organisms/useAccount";
import RankCard from "./RankCard";

interface Rank {
	id: number,
	username: string,
	score: number
	avatar:string
}

const Ranking = () => {

	const [rank, setRank] = useState<Rank[]>([]);

	useEffect(() => {
		const getRank = async () => {
			try {
				const response = await axios.get("http://localhost:4000/user/ranking");
				setRank(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des scores :", error);
			}
		}
		getRank();
	}, []);

	return (
		<div className="bg-black/50 h-full w-full rounded-md">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Ranking</h1>
			</div>

			<div className="h-full m-2.5 bg-black/10 rounded-md	 box-border justify-center items-center max-h-[80%]">
				<div className="h-[10%] bg-white flex w-full items-center text-center font-semibold rounded-md">
					<h1 className="w-1/3">rank</h1>
					<h1 className="w-1/3">name</h1>
					<h1 className="w-1/3">points</h1>
				</div>
				<div className="h-[90%] overflow-y-auto overflow-x-hidden">
					{rank?.map((rank: Rank, id: number) => (
						<RankCard key={id} rank={rank} id={id + 1} />
					))}
				</div>
			</div>
		</div >
	);
}

export default Ranking;