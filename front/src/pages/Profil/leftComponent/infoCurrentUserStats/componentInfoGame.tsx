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

export const GameStats = () => {
	let bubbleData = [
		{ stats: 1, name: "total win" },
		{ stats: 1, name: "total win" },
		{ stats: 1, name: "total win" },

	];
	return (
		<div className="relative py-4 b overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll gray-border h-full bg-gray-50">
			<table className="border-separate border-spacing-2 w-full">
				<tbody>
					{bubbleData.map((data, index) => (
						<BubbleBody key={index} stats={data.stats} name={data.name} />
					))}
				</tbody>
			</table>
		</div>
		// <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
		// 	<table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
		// 		<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
		// 		<tr>
		// 			<th scope="col" className="px-6 py-3">
		// 				Product name
		// 			</th>
		// 			<th scope="col" className="px-6 py-3">
		// 				Color
		// 			</th>
		// 		</tr>
		// 		</thead>
		// 		<tbody>
		// 		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
		// 			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		// 				Apple MacBook Pro 17"
		// 			</th>
		// 			<td className="px-6 py-4">
		// 				Silver
		// 			</td>
		// 		</tr>
		// 		<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
		// 			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		// 				Microsoft Surface Pro
		// 			</th>
		// 			<td className="px-6 py-4">
		// 				White
		// 			</td>
		// 		</tr>
		// 		<tr className="bg-white dark:bg-gray-800">
		// 			<th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
		// 				Magic Mouse 2
		// 			</th>
		// 			<td className="px-6 py-4">
		// 				Black
		// 			</td>
		// 		</tr>
		// 		</tbody>
		// 	</table>
		// </div>
	);
}
