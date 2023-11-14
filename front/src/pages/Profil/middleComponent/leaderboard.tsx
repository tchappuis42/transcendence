import * as React from "react"
import "./leaderboard.css"
import "../styleProfilPage/mainCSS.css"
import {BubbleHeadLeaderboard, BubbleBodyLeaderboard} from "./leaderboardInfo/leaderboardComponent"
import {BubbleHeadMatchHistory, BubbleBodyMatchHistory} from "./leaderboardInfo/matchHistoryComponent"

export const Leaderboard = () => {

	let bubbleData = [
		{ stats: 100, name: "total win", user: "keke" },
		{ stats: 110, name: "total win", user: "nene" },
		{ stats: 10, name: "total win", user: "pepe" },
		{ stats: 1900, name: "total win", user: "cece" },
		{ stats: 2, name: "total win", user: "gege" },
		{ stats: 3333, name: "total win", user: "lele" },
		{ stats: 230, name: "total win", user: "ieie" },
		{ stats: 890, name: "total win", user: "zeze" },
		{ stats: 35345, name: "total win", user: "xexe" },
		{ stats: 453, name: "total win", user: "rere" },
		{ stats: 34, name: "total win", user: "jeje" },
		{ stats: 57, name: "total win", user: "meme" },
		{ stats: 5755, name: "total win", user: "oeoe" },
		{ stats: 5664, name: "total win", user: "hehe" },
		{ stats: 566, name: "total win", user: "ueue" },
		{ stats: 345, name: "total win", user: "sese" },
	];

	bubbleData.sort((a, b) => b.stats - a.stats);

	return (
		<div className="middle-component-main">
			<div className="middle-component-table gray-border">
				<table className="border-separate border-spacing-2 w-full">
					<thead>
						<div className="flex justify-center h-[50px] font-bold">
							Leaderboard
						</div>
					</thead>
					<thead>
						<BubbleHeadLeaderboard index={"rank"} user={"user"} name={"name"} stats={"stats"}/>
					</thead>
					<tbody>
						<div className="bubble-component">
							{
								bubbleData.map((data, index) => (
								<BubbleBodyLeaderboard
											key={index}
											index={index + 1}
											stats={data.stats}
											name={data.name}
											user={data.user}
											className={data.user === "ieie" ? "sticky top-0 bg-blue-200" : undefined}
								/>
							))}
						</div>
					</tbody>
					<thead>
						<div className="flex justify-center items-center h-[50px] font-bold">
							Match history
						</div>
					</thead>
					<thead>
						<BubbleHeadMatchHistory index={"rank"} user={"user"} name={"name"} stats={"stats"}/>
					</thead>
					<tbody>
						<div className="bubble-component">
							{bubbleData.map((data, index) => (
								<BubbleBodyMatchHistory key={index} index={index + 1}
											stats={data.stats}
											name={data.name}
											user={data.user}
											className={data.user === "ieie" ? "sticky top-0 bg-blue-200" : undefined}

								/>
							))}
						</div>
					</tbody>
				</table>
			</div>
		</div>
	);
}