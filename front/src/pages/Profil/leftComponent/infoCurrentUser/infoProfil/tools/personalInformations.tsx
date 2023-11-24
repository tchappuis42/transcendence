import React, {useState, useEffect} from "react"
import axios from "axios";
import "../../../../styleProfilPage/toolsCss.css"
import "../infoProfile.css"
import {useAccount} from "../../../../../../ui/organisms/useAccount";
import {UserStatus} from "../../../../tools/userStatus";
import {useParams} from "react-router-dom";
import {RankUsers} from "../../../../tools/rank";

interface Rank {
	username: string,
	score: number
}

interface Id {
	id: number;
}
export const MyName = ({id}: Id) => {
	const { account } = useAccount()
	const { sorted } = UserStatus();
	const {userRank, myRank, myIndex} = RankUsers();
	const cUser = id === account.id ? account.username : sorted.find(u => u.id === id)?.username;
	const scores = id === account.id ? myRank?.score : userRank.find(u => u.username === cUser);

	// const cRank = id === account.id ? myRank?.score : userRank.find(u => u.username === cUser);
	let index: number = 0;
	// const user = id === account.id ? account:sorted.find(u => u.id === id);

	return (
		<div className="rest-information-component black-border-fine">
			<div className="name-component black-border-separation-b">
				{cUser}
			</div>
			<div className="rank-component">
				<div className="current-level-component">
					rank: {index}
				</div>
			</div>
		</div>
	);
}
