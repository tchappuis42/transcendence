import React, {useEffect, useState} from "react";
import "./infoLevel.css"
import {LevelBar} from "./tools/levelBar";
import {useAccount} from "../../../../../ui/organisms/useAccount";
import {useGetUser, UserStatus} from "../../../tools/userStatus";
import {RankUsers} from "../../../tools/rank";

interface User {
	id: number;
	username: string;
  }
  
  interface LevelUserProps {
	user: User | undefined;
  }


export const LevelUser : React.FC<LevelUserProps> = ({user}): JSX.Element => {

	const [progress, setProgress] = useState(0);
	const [level, setLevel] = useState(0);
	const {userRank} = RankUsers();
	const rank = userRank.find(u => u.username === user?.username)
	const userScore = rank?.score

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
		<div className="level-user-component gray-border">
			<div className="level-current-component text-white ">
				level {level}
			</div>
			<LevelBar progress={ progress }/>
		</div>
	);
};
