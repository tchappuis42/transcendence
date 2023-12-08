import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/index.css"
import "./styleProfilPage/mainCSS.css"
import "./styleProfilPage/toolsCss.css"
// import {LeftComponent} from "./leftComponent/leftComponent"
// import {Leaderboard} from "./middleComponent/leaderboard"
// import {ChatSide} from "./rightComponent/chatSide"

import {useCallback, useEffect, useState} from "react";
import MenuCard from "../HomePage/MenuCard";
import ProfilCard from "../HomePage/CardContent/ProfilCard";

import ChatCard from "../HomePage/CardContent/ChatCard";

import {useAccount} from "../../ui/organisms/useAccount";
import FriendsChat from "../Chat/component/FriendsChat";
import {LeftComponent} from "./leftComponent/leftComponent";
import FriendsToAdd from '../Friend/component/AddFriend';
import Ranking from '../Game/Ranking';
import MatchHistory from '../Game/matchHistory';

interface User {
	username : string;
	id : number;
	avatar : string;
	twoFa: boolean;
	status : number;
}

export const Profil = () => {
	const [score, setScore] = useState<number | undefined>();
	const { account } = useAccount()
	// const { id } = useParams();
	const [user, setUser] = useState<User>()
	const location = useLocation();
	const { id } = location.state ? location.state : account.id;

	useEffect(() => {
		if (String(id) !== String(account.id))
		{
			const getUsersByID = async () => {
				try {
					const response = await axios.get(`http://localhost:4000/user/byId/${id}`)
					setUser(response.data)
				}
				catch (error) {
					console.error(`Error fetching user game history with ID ${id}:`, error);
					return (null);
				}
			}
			getUsersByID()
		}
		else
		setUser(account);
	}, [id])


	return (
		<div className="w-full h-[1500px] lg:h-[850px] py-10 px-2 xl:px-20" >
			<div className="grid grid-cols-1 grid-rows-4 gap-4 lg:grid-cols-2 lg:grid-rows-2 w-full h-full p-2.5">
				<MenuCard>
					<LeftComponent user={user}/>
				</MenuCard>
				<MenuCard>
					<MatchHistory userId={user?.id}></MatchHistory>
				</MenuCard>
				<MenuCard>
					<FriendsChat set_channel={""}/>
				</MenuCard>
				<MenuCard>
					<Ranking></Ranking>
				</MenuCard>
			</div>
		</div>
	);
}