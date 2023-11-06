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

	//h-1/2 w-2/5 bg-gray-300 items-center flex-col flex
	/* 			<h1 className="text-xl sm:text-3xl font-bold">Ranking</h1>
			<div className="flex justify-around w-full ">
				<h3 className="text-base">rank</h3>
				<h3 className="text-base">name</h3>
				<h3 className="text-base">points</h3>
			</div>
			{myIndex + 1} {myRank?.username} {myRank?.score}
			<div className="scroll-y-auto flex flex-col justify-around w-full ">
				{rank.map((user, id) => <p className="justify-around items-around" key={id} >{id + 1}. {user.username} {user.score}</p>)}
			</div>
			*/
	return (
		<div className="w-full p-4 h-56 bg-white/50 rounded-3xl items-center flex-col flex my-1 sm:w-2/5">
			<h1 className="text-3xl sm:text-3xl font-bold h-10">Ranking</h1>
			<div className="flex flex-col h-[9.5rem] w-full">
				<div className="rounded border border-red-600">
					<table className="sticky top-0 w-full">
							<tr>
								<th className="w-1/3 text-center">rank</th>
								<th className="w-1/3 text-center">name</th>
								<th className="w-1/3 text-center">points</th>
							</tr>
					</table>
				</div>
				<div className="rounded border border-blue-600 overflow-y-auto">
				<table className="w-full">
					<thead className="sticky top-0 bg-sky-200 w-full">
						<tr className="text-blue-800">
							<td className="flex justify-center">{myIndex + 1}</td>
							<td>{myRank?.username}</td>
							<td className="flex justify-center">{myRank?.score}</td>
						</tr>
					</thead>
					<tbody className="w-full">
						{rank.map((user, id) => (
							<tr key={id} className="">
								<td className="w-1/3 text-center">{id + 1}</td>
								<td className="w-1/3">{user.username}</td>
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