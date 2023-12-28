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
				const response = await axios.get("/api/user/ranking");
				setRank(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des scores :", error);
			}
		}
		getRank();
	}, []);

	return (
		<div className="m-card bg-gray-200/60">
			<div className='grid grid-cols-3 header-card'>
				<h1 className="w-full flex justify-center">rank</h1>
				<h1 className="w-full flex justify-center">name</h1>
				<h1 className="w-full flex justify-center">points</h1>
			</div>

			<div className="h-full m-2.5 rounded-md box-border justify-center items-center max-h-[80%]">
				<div className="body-card">
					{rank?.map((rank: Rank, id: number) => (
						<RankCard key={id} rank={rank} id={id + 1}/>
					))}
				</div>
			</div>
		</div >
	);
}

export default Ranking;