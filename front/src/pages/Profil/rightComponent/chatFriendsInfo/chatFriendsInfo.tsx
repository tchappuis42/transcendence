import * as React from "react"
import "../chatSide.css"
import "./chatFriendsInfo.css"
import {useEffect, useState} from "react";
import { Badge, Button } from "@material-tailwind/react";

// export const ChatUserHistoric = () => {
// 	return(
// 		<div className="chat-component-elements blue-border">
// 			<div className="users-component-elements-info col-span-1 red-border">rank</div>
// 			<div className="users-component-elements-info col-span-3 red-border">name</div>
// 		</div>
// 	);
// }
interface Props {
	index: number;
	user: string;
	name: string;
	stats: number;
	className: string | undefined;
}

export const ChatUserHistoric = ({index, stats, name, user, className}: Props) => {
	const [color, setColor] = useState("");

	useEffect(() => {
		const rankColor = () => {
			if (index > 0 && index <= 3)
				setColor("green");
			else if (index > 3 && index <= 6)
				setColor("yellow");
			else if (index > 10 && index <= 10)
				setColor("orange");
			else
				setColor("red");
			console.log("the color is : ", color, index);
		}
		rankColor();
	}, [index]);

	return (
		<tr className={className}>
			<div className={`${className} bubble-main black-border-fine snap-start hover:bg-${color}-200`}>
				<td className="col-span-1">
					<div className="bubble-row justify-start">{user}</div>
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