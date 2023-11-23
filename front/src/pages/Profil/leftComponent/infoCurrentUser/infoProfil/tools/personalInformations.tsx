import React, {useState, useEffect} from "react"
import axios from "axios";
import "../../../../styleProfilPage/toolsCss.css"
import "../infoProfile.css"
import {useAccount} from "../../../../../../ui/organisms/useAccount";
import {UserStatus} from "../../../../tools/userStatus";

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

export const MyName = () => {
	const { account } = useAccount()
	const { sorted } = UserStatus();

	return (
		<div className="rest-information-component black-border-fine">
			<div className="name-component black-border-separation-b">
				{account.username}
			</div>
			<div className="rank-component">
				<div className="current-level-component ">
					rank: {}
				</div>
			</div>
		</div>
	);
}
