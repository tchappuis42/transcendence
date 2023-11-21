import React, {useState, useEffect} from "react"
import axios from "axios";
import "../../../../styleProfilPage/toolsCss.css"
import "../infoProfile.css"
import {useAccount} from "../../../../../../ui/organisms/useAccount";
import {useGetUser} from "../../../../tools/userStatus";

interface Rank {
	username: string,
	score: number
}

interface user {
	id: number
	username: string
	status: number
}

export const MyName = () => {
	const { account } = useAccount()
	const [rank, setRank] = useState<Rank[]>([]);
	const [myRank, setMyRank] = useState<Rank>();
	const [users, setUsers] = useState<user[]>([]);

	// useEffect(() => {
	// 	const getUsers = async () => {
	// 		try {
	// 			const response = await axios.get("http://localhost:4000/user/users", { withCredentials: true });
	// 			console.log("data = ", response.data)
	// 			setUsers(response.data)
	// 		} catch (error) {
	// 			console.error("Erreur lors de la récupération des users :", error);
	// 		}
	// 	}
	// 	getUsers();
	// }, []);

	useEffect(() => {
		const me = users.find(user => user.username === account.username)
		setUsers(me);
	}, [rank]);

	useEffect(() => {
		const me = rank.find(user => user.username === account.username)
		setMyRank(me)
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

	return (
		<div className="rest-information-component black-border-fine">
			<div className="name-component black-border-separation-b">
				{users.}
			</div>
			<div className="rank-component">
				<div className="current-level-component ">
					rank: {myRank?.score}
				</div>
			</div>
		</div>
	);
}
