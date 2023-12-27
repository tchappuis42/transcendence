import React, {useState, useEffect} from "react"
import axios from "axios";
import "../../../styleProfilPage/toolsCss.css"
import "./infoProfile.css"
import {useAccount} from "../../../../../ui/organisms/useAccount";
import {UserStatus} from "../../../tools/userStatus";
import {useParams} from "react-router-dom";
import {RankUsers} from "../../../tools/rank";

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
	return (
		<div className="h-full grid grid-rows-2 gray-border">
			<div className="h-[1/2] name-component black-border-separation-b text-black/60">
				{username}
			</div>
			<div className="h-[1/2] font-extrabold name-component text-black/60">
				rank: {index + 1}
			</div>
		</div>
	);
}
