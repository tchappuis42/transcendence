import React, {useState} from "react";
import "./infoLevel.css"
import {LevelBar} from "./tools/levelBar";
import {useAccount} from "../../../../../ui/organisms/useAccount";
import {useGetUser, UserStatus} from "../../../tools/userStatus";
import {RankUsers} from "../../../tools/rank";

interface Props {
	id: number;
}

class Rank {
	score: number | undefined;
	username: string | undefined;
}

export const LevelUser = ({id}: Props): JSX.Element => {

	const [progress, setProgress] = useState(0);
	const [level, setLevel] = useState(0);
	const { account } = useAccount();
	const { sorted } = UserStatus();
	const {userRank, myRank, myIndex} = RankUsers();

	let user = sorted.find(u => u.id === id);
	let user_c: string = "";
	let user_rank: number = 0;

	if (user == null) {
		user_c = account.username;
		// console.log("user_object_score: ", userRank.find(u => u.username === user_c));
		user_rank = myRank?.score || 0;
	}
	else {
		user_c = user.username;
		let user_object_score: Rank | undefined = userRank.find(u => u.username === user_c);
		if (user_object_score)
			user_rank = user_object_score.score || 0;
	}

	if (progress === 100) {
		user_rank = 500;
		let lvl0: number = 500
		let lvlUP: number = user_rank - lvl0;
		// console.log("lvl up = ", lvlUP, user_rank);
		setProgress(0);
		setLevel(level + 1);
	}
	else {
		setProgress(progress + 20);
	}
	const handleReset = (): void => {
		setProgress(0);
		setLevel(0);
	}
	return (
		<div className="level-user-component black-border-fine">
			<div className="level-current-component">
				level {level}
			</div>
			<LevelBar progress={ progress }/>
		</div>
	);
};
