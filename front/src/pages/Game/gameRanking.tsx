import axios from "axios";
import { useEffect, useState } from "react";

interface Rank {
	username: string,
	score: number
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
		<div className="box2">
			<h1>Ranking</h1>
			<a> rank name points</a>
			{rank.map((user, id) => <p key={id} >{id + 1}. {user.username} {user.score}</p>)}
		</div>
	);
}

export default Ranking;