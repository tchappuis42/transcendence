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
		const me = rank.find(user => user.username === account.username)
		const index = rank.findIndex(user => user.username === account.username)
		setMyRank(me)
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

	function background(id: number) {
		if (id % 2)
			return 'rgba(169, 169, 169, 0.5)';
		return 'rgba(169, 169, 169, 0.3)'
	}

	return (
		<div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Ranking</h1>
			</div>

			<div className="h-full m-2.5 bg-black/10 rounded-md	shadow-md shadow-white box-border justify-center items-center max-h-[80%]">
				<table className="top-0 w-full bg-white rounded-md">
					<tr>
						<th className="w-1/3 text-center">rank</th>
						<th className="w-1/3 text-center">name</th>
						<th className="w-1/3 text-center">points</th>
					</tr>
				</table>
				<div className="h-[90%] rounded-md overflow-y-auto p-2.5">
					<table className="w-full h-full">
						<thead className="bg-sky-200 w-full h-1/5">
							<tr className="text-blue-800">
								<td className="text-center">{myIndex + 1}</td>
								<td className="text-center">{myRank?.username}</td>
								<td className="text-center">{myRank?.score}</td>
							</tr>
						</thead>
						<tbody className="w-full h-1/5">
							{rank.map((user, id) => (
								<tr key={id} style={{ background: background(id + 1) }} className="h-2/5">
									<td className="w-1/3 text-center">{id + 1}</td>
									<td className="text-center">{user.username}</td>
									<td className="w-1/3 text-center">{user.score}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}

export default Ranking;