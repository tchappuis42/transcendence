import * as React from "react"
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

export default function Example() {
	return <Button>Button</Button>;
}

async function getUserByID(id: any) {
	try {
		const response = await axios.get(`http://localhost:4000/user/${id}`)
		return (response.data);
	}
	catch (error) {
		console.error(`Error fetching user with ID ${id}:`, error);
		return (null);
	}
}

export const Profil = () => {
	const { account } = useAccount()
	const { id } = useParams();

	const fetchUser = async () => {
		const user = await getUserByID(id);
		console.log("getUserById: ", user);
	}

	function renderElement() {
		if(id !== '1') {
			return (
				<>
					<div className="mainTable h-screen-top-bar
					grid-cols-1 md:grid-cols-2">
						<LeftComponent id={parseInt(id as string, 10)}/>
						<Leaderboard id={parseInt(id as string, 10)}/>
					</div>
				</>
			)
		}
		return (
			<>
				<div className="mainTable h-screen-top-bar
				grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
					<LeftComponent id={parseInt(id as string, 10)}/>
					<Leaderboard id={parseInt(id as string, 10)}/>
					<ChatSide/>
				</div>
			</>
		);
	}

	console.log("account: ",id);
	fetchUser();

	return (
		<>
			<div className="mainBox gap-4">
				{renderElement()}
			</div>
		</>
	);
}