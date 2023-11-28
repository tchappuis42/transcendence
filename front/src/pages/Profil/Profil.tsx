import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import "../../css/index.css"
import "./styleProfilPage/mainCSS.css"
import "./styleProfilPage/toolsCss.css"
import {LeftComponent} from "./leftComponent/leftComponent"
import {Leaderboard} from "./middleComponent/leaderboard"
import {ChatSide} from "./rightComponent/chatSide"
import { Button } from "@material-tailwind/react";
import {useAccount} from "../../ui/organisms/useAccount";
import {useCallback, useEffect, useState} from "react";

export default function Example() {
	return <Button>Button</Button>;
}

interface User {
	username : string;
	id : number;
}

export const Profil = () => {
	const [score, setScore] = useState<number | undefined>();
	const { account } = useAccount()
	// const { id } = useParams();
	const [user, setUser] = useState<User>()
	const location = useLocation();
	const { id } = location.state;

	useEffect(() => {
		console.log("user id :", id);
		if (String(id) !== String(account.id))
		{
			console.log("on charge un autre utilisateur")
			const getUsersByID = async () => {
				try {
					const response = await axios.get(`http://localhost:4000/user/${id}`)
					console.log("iddddddddd", response.data)
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
		<>
			<div className="mainBox gap-4">
			<div className="mainTable h-screen-top-bar
				grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					<LeftComponent user={user}/>
					<Leaderboard user={user}/>
					{String(id) === String(account.id) &&
						<ChatSide />
					}
				</div>
			</div>
		</>
	);
}