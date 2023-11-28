import React from 'react';
import { useParams } from 'react-router-dom';
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
	// const [user, setUser] = useState<string | undefined>();
	const [score, setScore] = useState<number | undefined>();
	const { account } = useAccount()
	const { id } = useParams();
	const [user, setUser] = useState<User>()

	// const FetchUser = useCallback(async () => {
	// 	const user = await getUserByID(id);
	// 	console.log("getUserById: ", user);
	// 	// debugger
	// 	setUser(user.username);
	// 	setScore(user.score);
	// }, []);
	// useEffect(() => {
	// 	FetchUser();
	// }, []);

	useEffect(() => {
		if (String(id) !== String(account.id))
		{
			const getUsersByID = async () => {
				try {
					const response = await axios.get(`http://localhost:4000/user/${id}`)
					console.log("id", response.data)
					setUser(response.data)
				}
				catch (error) {
					console.error(`Error fetching user with ID ${id}:`, error);
					return (null);
				}
			}
			getUsersByID()
		}
	}, [])

	console.log("user and score: ", user, score);

	function renderElement() {
		if(parseInt(id as string, 10) !== account.id) {
			return (
				<>
					<div className="mainTable h-screen-top-bar
					grid-cols-1 md:grid-cols-2">
						{/* <LeftComponent id={parseInt(id as string, 10)}/> */}
						{/* <Leaderboard id={parseInt(id as string, 10)}/> */}
					</div>
				</>
			)
		}
		return (
			<>
				<div className="mainTable h-screen-top-bar
				grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{/* <LeftComponent id={parseInt(id as string, 10)}/> */}
					{/* <Leaderboard id={parseInt(id as string, 10)}/> */}
					<ChatSide/>
				</div>
			</>
		);
	}

	// console.log("account: ",id, account.id);


	return (
		<>
			<div className="mainBox gap-4">
			<div className="mainTable h-screen-top-bar
				grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					{/* <LeftComponent id={parseInt(id as string, 10)}/> */}
					{/* <Leaderboard id={parseInt(id as string, 10)}/> */}
					{String(id) === String(account.id) &&
						<ChatSide />
					}
				</div>
				{/* {renderElement()} */}
			</div>
		</>
	);
}