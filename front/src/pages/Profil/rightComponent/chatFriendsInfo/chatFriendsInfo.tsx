import * as React from "react"
import "../chatSide.css"
import "./chatFriendsInfo.css"
import {useEffect, useState} from "react";
import { Badge, Button } from "@material-tailwind/react";

interface Props {
	index: number;
	user: string;
	name: string;
	stats: number;
}

export const ChatUserHistoric = ({index, stats, name, user}: Props) => {
	const [colorBadge, setColorBadge] = useState("");

	useEffect(() => {
		const rankColor = () => {
			if (index > 0 && index <= 3)
				setColorBadge("green");
			else if (index > 3 && index <= 6)
				setColorBadge("yellow");
			else if (index > 10 && index <= 10)
				setColorBadge("orange");
			else
				setColorBadge("red");
			console.log("the color is : ", colorBadge, index);
		}
		rankColor();
	}, [index]);

	return (
		<tr>
			<div className={`bubble-main black-border-fine snap-start hover:bg-${colorBadge}-200`}>
				<td className="col-span-1">
					<Badge color="green">
						<Button>
							<div className="bubble-row justify-start">{user}</div>
						</Button>
					</Badge>
				</td>
				<td className="col-span-3 flex justify-center">
					<div className="bubble-row justify-center">{name}</div>
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