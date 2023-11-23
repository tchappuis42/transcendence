import React, {useState, useEffect} from "react"
import axios from "axios";
import "../../../../styleProfilPage/toolsCss.css"
import "../infoProfile.css"
import {useAccount} from "../../../../../../ui/organisms/useAccount";
import {UserStatus} from "../../../../tools/userStatus";
import {useParams} from "react-router-dom";

interface Rank {
	username: string,
	score: number
}

interface Props {
	user: string;
	status: number;
	id: number;
	cID: number;
}

interface Id {
	id: number;
}
export const MyName = ({id}: Id) => {
	const { account } = useAccount()
	const { sorted } = UserStatus();
	const user = sorted.find(u => u.id === id);
	const [myRank, setMyRank] = useState<Rank[]>([]);

	let me;
	useEffect(() => {
		if (user!.id === account.id)
			me = myRank.find(u => u.username)
		else
			me = myRank.find(u => u.username)
		setMyRank(me ? [me] : []);
	}, [myRank]);

	return (
		<div className="rest-information-component black-border-fine">
			<div className="name-component black-border-separation-b">
				{user!.username}
			</div>
			<div className="rank-component">
				<div className="current-level-component">
					{myRank.map(u => u.username === user!.username)}
				</div>
			</div>
		</div>
	);
}
