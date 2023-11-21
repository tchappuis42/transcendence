import * as React from "react"
import "../chatSide.css"
import "./chatFriendsInfo.css"
import Status from "../../../Game/status"
import {useEffect, useState} from "react";
import { Badge, Button } from "@material-tailwind/react";
import {UserStatus} from "../../tools/userStatus";

interface Props {
	index: number;
	user: string;
	status: number;
}

export const ChatUserHistoric = ({index, user, status}: Props) => {
	const [colorBadge, setColorBadge] = useState("");
	const [isActive, setIsActive] = useState(false);

	function getStatusColor(status: number) {
		switch (status) {
			case 0:
				return 'red'; // Hors ligne
			case 1:
				return 'green'; // En ligne
			case 2:
				return 'orange'; // En jeu (ou tout autre statut)
			default:
				return 'blue'; // Par défaut (au cas où)
		}
	}

	return (
		<tr className="gap-2">
			<div className={`bubble-main-chat black-border-fine snap-start w-full`}>
				<td className="col-span-1">
					<Badge color={getStatusColor(status)}>
						<Button>
							<div className="bubble-row justify-center">
								{status}
							</div>
						</Button>
					</Badge>
				</td>
				<td className="col-span-3 flex justify-center">
					<div className="bubble-row justify-start">{user}</div>
				</td>
			</div>
		</tr>
	);
}

export const ChatUserOnline = () => {
	return(
		<div className="online-component-elements blue-border">
			<div className="users-component-elements-info col-span-1 red-border">rank</div>
			<div className="users-component-elements-info col-span-3 red-border">name</div>
		</div>
	);
}