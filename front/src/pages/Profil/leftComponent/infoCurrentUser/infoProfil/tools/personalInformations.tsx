import React, {useState, useEffect} from "react"
import axios from "axios";
import "../../../../styleProfilPage/toolsCss.css"
import "../infoProfile.css"
import {useAccount} from "../../../../../../ui/organisms/useAccount";
import {UserStatus} from "../../../../tools/userStatus";
import {useParams} from "react-router-dom";
import {RankUsers} from "../../../../tools/rank";

interface Rank {
	id: number | undefined,
	username: string  | undefined,
	index: number
}

interface Id {
	username: string;
	index: number;
}

export const MyName = ({id, username, index}: Rank) => {
	const { account } = useAccount()
	const { sorted } = UserStatus();
	const {userRank, myRank, myIndex} = RankUsers();
	// const cUser = id === account.id ? account.username : sorted.find(u => u.id === id)?.username;
	// const scores = id === account.id ? myRank?.score : userRank.find(u => u.username === cUser);

	// console.log("index: ", username, index);
	return (
		<div className="rest-information-component gray-border">
			<div className="name-component black-border-separation-b text-white">
				{username}
			</div>
			<div className="rank-component">
				<div className="current-level-component text-white">
					rank: {index + 1}
				</div>
			</div>
		</div>
	);
}
