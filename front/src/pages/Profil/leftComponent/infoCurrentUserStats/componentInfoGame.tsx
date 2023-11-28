import React from "react";
import "./componentInfoGame.css"
import {UserGameWin} from "./infoProfil/userGameWin";
interface Props {
	stats: number;
	name: string;
}


const BubbleBody = ({stats, name}: Props) => {
	return (
		<tr>
			<div className="border-2 border-solid border-black grid grid-cols-3 rounded min-h-[40px]">
				<td className="col-span-2">
					<div className="px-4 blue-border flex flex-row justify-start items-center h-full">{name}</div>
				</td>
				<td className="col-span-1">
					<div className="blue-border flex flex-row justify-center items-center h-full">{stats}</div>
				</td>
			</div>
		</tr>
	);
}

interface Id {
	id: number | undefined;
}

export const GameStats = ({id}: Id) => {
	let bubbleData = [
		{ stats: 1, name: "total win" },
		{ stats: 1, name: "total win" },
		{ stats: 1, name: "total win" },
	];
	return (
		<div className="relative py-4 b overflow-x-auto shadow-md sm:rounded-lg
		overflow-y-scroll gray-border h-full bg-gray-50">
			<table className="border-separate border-spacing-2 w-full">
				<tbody>
					{bubbleData.map((data, index) => (
						<BubbleBody key={index} stats={data.stats} name={data.name} />
					))}
				</tbody>
			</table>
		</div>
	);
}
