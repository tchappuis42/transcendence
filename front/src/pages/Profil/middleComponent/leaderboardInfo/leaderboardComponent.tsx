import * as React from "react"
import "../leaderboard.css"
import "../../styleProfilPage/mainCSS.css"
import {useEffect, useState} from "react";

interface Props {
	index: number;
	user: number;
	name: string;
	stats: number;
	className: string | undefined;
}

interface PropsHead {
	index: string;
	user: string;
	name: string;
	stats: string;
}

export const BubbleHeadLeaderboard = ({index, user, name, stats}: PropsHead) => {
	return (
		<tr>
			<div className="bubble-main black-border-fine bg-gray-200">
				<td className="col-span-1">
					<div className="bubble-row justify-center">{index}</div>
				</td>
				<td className="col-span-1">
					<div className="bubble-row justify-start">{user}</div>
				</td>
				<td className="col-span-3 flex justify-center">
					<div className="bubble-row justify-center">{name}</div>
				</td>
				<td className="col-span-1">
					<div className="bubble-row justify-end px-2">{stats}</div>
				</td>
			</div>
		</tr>
	);
}

export const BubbleBodyLeaderboard = ({index, stats, name, user, className}: Props) => {
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
		}
		rankColor();
	}, [index]);

	return (
		<tr className={className}>
			<div className={`${className} bubble-main black-border-fine snap-start hover:bg-${color}-200`}>
				<td className="col-span-1">
					<div className="bubble-row justify-center">{index}</div>
				</td>
				<td className="col-span-1">
					<div className="bubble-row justify-start">{user}</div>
				</td>
				<td className="col-span-3 flex justify-center">
					<div className="bubble-row justify-center">{name}</div>
				</td>
				<td className="col-span-1">
					<div className="bubble-row justify-end px-2">{stats}</div>
				</td>
			</div>
		</tr>
	);
}

