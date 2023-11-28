import * as React from 'react'
import "../../../styleProfilPage/mainCSS.css"
import "../infoProfilComponent.css"
import "./infoProfile.css"
import {MyName} from "./tools/personalInformations"
import {useAccount} from "../../../../../ui/organisms/useAccount";
import {UserStatus} from "../../../tools/userStatus";
import {RankUsers} from "../../../tools/rank";
import {BubbleBodyLeaderboard} from "../../../middleComponent/leaderboardInfo/leaderboardComponent";
import axios from "axios";
import {useEffect, useState} from "react";

interface Props {
	id: number;
}

class Rank {
	score: number | undefined;
	username: string | undefined;
}

export const InfoProfileUser = ({id}: Props): JSX.Element => {

	// let user = sorted.find(u => u.id === id);
	// let user_c: string = "";
	// let user_rank: number = 0;
	// let user_object_score = myRank?.score;
	// let index: number = 1;
	//
	// const { account } = useAccount()
	// const { sorted } = UserStatus();
	// const { userRank, myRank, myIndex} = RankUsers();

	// const [user, setUser] = useState<string | undefined>();
	// const [score, setScore] = useState<number | undefined>();
	//
	// const FetchUser = async () => {
	// 	console.log("id: ", id);
	// 	const user = await getUserByID(id);
	// 	console.log("getUserById1: ", user);
	// 	useEffect(() => {
	// 			setUser(user.username);
	// 			setScore(user.score);
	// 	}, [setUser, setScore]);
	// 	return user;
	// }

	// useEffect(() => {
	// 	fetchUser().then(user => {
	// 		setUser(user.username);
	// 		setScore(user.score);
	// 	});
	// }, [setUser, setScore]);

	// console.log("user: ",username, score)
	// if (user == null) {
	// 	// console.log("user == null");
	//
	// 	user_c = account.username;
	// 	user_rank = user_object_score || 0;
	// }
	// else {
	// 	user_c = user.username;
	// 	let user_object_score: Rank | undefined = userRank.find(u => u.username === user_c);
	// 	// console.log("find: ", userRank.find(u => u.username === user_c) || 0);
	// 	if (user_object_score)
	// 		user_rank = user_object_score.score || 0;
	// 	else
	// 		user_rank = 0;
	// 	userRank.map(u=> {
	// 		if (u.score > user_rank)
	// 			index++;
	// 	})
	// }

	// console.log ("user_c =", user_c, user_rank, index);

	return (
			<div className="information-user-component">
				<img alt="image de profil" className="rounded h-full col-span-1 black-border-fine"
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
				<div className="text-information-component">
					<MyName id={id} username={""} index={0}/>
				</div>
			</div>
	);
}