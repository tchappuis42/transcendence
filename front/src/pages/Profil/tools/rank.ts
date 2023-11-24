import {useEffect, useState} from "react";
import {useAccount} from "../../../ui/organisms/useAccount";
import axios from "axios/index";

interface Rank {
	username: string,
	score: number
}

export const RankUsers = () => {
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

	return ({rank, myRank});
}