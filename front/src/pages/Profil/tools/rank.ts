import {useEffect, useState} from "react";
import {useAccount} from "../../../ui/organisms/useAccount";
import axios from "axios";

interface Rank {
	username: string,
	score: number
}

export const RankUsers = () => {
	const [userRank, seUsertRank] = useState<Rank[]>([]);
	const [myRank, setMyRank] = useState<Rank>();
	const [myIndex, setIndex] = useState<number>(0);
	const { account } = useAccount();

	useEffect(() => {
		const me = userRank.find(user => user.username === account.username)
		const index = userRank.findIndex(user => user.username === account.username)
		setMyRank(me)
		setIndex(index)
	}, [userRank]);

	useEffect(() => {
		const getRank = async () => {
			try {
				const response = await axios.get("/api/user/ranking");
				seUsertRank(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération des scores :", error);
			}
		}
		getRank();
	}, []);

	return ({userRank, myRank, myIndex});
}