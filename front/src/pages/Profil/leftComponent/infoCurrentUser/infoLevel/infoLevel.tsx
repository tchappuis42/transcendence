import React, {useEffect, useState} from "react";
import "./infoLevel.css"
import {LevelBar} from "./tools/levelBar";
import {useAccount} from "../../../../../ui/organisms/useAccount";
import {useGetUser, UserStatus} from "../../../tools/userStatus";
import {RankUsers} from "../../../tools/rank";

interface Props {
	id: number | undefined;
}

class Rank {
	score: number | undefined;
	username: string | undefined;
}

export const LevelUser = ({id}: Props): JSX.Element => {

	const [progress, setProgress] = useState(0);
	const [level, setLevel] = useState(0);
	const {myRank} = RankUsers();
	const userScore = myRank?.score;

	useEffect(()=>{
		if (userScore)
		{
			const level = Math.floor(userScore / 500);
			setLevel(level);
			const remainingProgress = userScore % 500;
			const newProgress = (remainingProgress / 500) * 100;
			setProgress(newProgress);
		}
	}, [userScore])

	return (
		<div className="level-user-component black-border-fine">
			<div className="level-current-component">
				level {level}
			</div>
			<LevelBar progress={ progress }/>
		</div>
	);
};
