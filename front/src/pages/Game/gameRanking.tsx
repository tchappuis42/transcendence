import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "../../ui/organisms/useAccount";

interface Rank {
	username: string,
	score: number
}

const Ranking = () => {

	const [rank, setRank] = useState<Rank[]>([]);
	const [myRank, setMyRank] = useState<Rank>();
	const [myIndex, setIndex] = useState<number>(0);
	const { account } = useAccount();

	useEffect(() => {
		const my = rank.find(user => user.username === account.username)
		const index = rank.findIndex(user => user.username === account.username)
		if (my)
			setMyRank(my)
		if (index)
			setIndex(index)
	}, [rank]);

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

	//h-1/2 w-2/5 bg-gray-300 items-center flex-col flex
	return (
		<div className="h-1/2 w-2/5 bg-gray-300 items-center flex-col flex">
			<h1 className="text-xl sm:text-3xl">Ranking</h1>
			<div className="flex justify-around w-full">
				<h3 className="text-base">rank</h3>
				<h3 className="text-base">name</h3>
				<h3 className="text-base">points</h3>
			</div>
			{myIndex + 1} {myRank?.username} {myRank?.score}
			{rank.map((user, id) => <p key={id} >{id + 1}. {user.username} {user.score}</p>)}
		</div>
	);
}

export default Ranking;