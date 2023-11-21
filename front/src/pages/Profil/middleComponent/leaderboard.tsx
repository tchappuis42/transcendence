import * as React from "react"
import "./leaderboard.css"
import "../styleProfilPage/mainCSS.css"
import {BubbleHeadLeaderboard, BubbleBodyLeaderboard} from "./leaderboardInfo/leaderboardComponent"
import {BubbleHeadMatchHistory, BubbleBodyMatchHistory, MatchHistory} from "./leaderboardInfo/matchHistoryComponent"
import {useEffect, useState} from "react";

interface CurrentUser {
	user: string;
	name: string;
	stats: number;
}

interface Player {
	user: string;
	name: string;
	stats: number;
}

interface Match {
	player1: string;
	player2: string;
	score1: number;
	score2: number;
	winner: string;
}

export const BubbleData = () => {
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
	return (bubbleData);
}

export const GetHistoricalMatch = (bubbleData: Player[], CUser: CurrentUser): Match[] => {
	let matches: Match[] = [];
	const currentUserIndex = bubbleData.findIndex(player => player.user === CUser?.user);
	let user: Player = bubbleData[currentUserIndex];
		for (let j = 0; j < bubbleData.length; j++) {
			if (j === currentUserIndex)
				j++;
			let player2: Player = bubbleData[j];

			let score1: number = Math.round((user.stats * Math.random() * 10) % 10);
			let score2: number = Math.round((player2.stats * Math.random() * 10) % 10);

			let winner;

			if (score1 > score2)
				winner = user;
			else
				winner = player2;

			matches.push({
				player1: user.user,
				player2: player2.user,
				score1: score1,
				score2: score2,
				winner: winner.user
			});
		}
	return (matches);
}

export const SetCurrentUsr = (bubbleData: Player[], cUser: string): Match[] => {
	const [currentUser, setCurrentUser] = useState<Player | null>(null);

	bubbleData.sort((a, b) => b.stats - a.stats);
	const user = bubbleData.find(player => player.user === cUser);

	useEffect((): void => {
		setCurrentUser(user ? user : null);
	}, [cUser]);
	let matches: Match[] = [];

	if (currentUser)
		matches = GetHistoricalMatch(bubbleData, currentUser);

	const currentUserMatches: Match[] = matches.filter(match => match.player1 === currentUser?.user);
	return (currentUserMatches);
}

export const Leaderboard = () => {
	const cUser: "ieie" = "ieie";

	let bubbleData = BubbleData();

	const currentUserMatches: Match[] = SetCurrentUsr(bubbleData, cUser);

	return (
		<div className="middle-component-main">
			<div className="middle-component-table gray-border">
				<table className="border-separate border-spacing-2 w-full items-start">
					<thead>
						<div className="flex justify-center items-center h-[80px] font-bold">
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
				</table>
				<table className="border-separate border-spacing-2 w-full items-end">
					<thead>
						<div className="flex justify-center items-center h-[86px] font-bold">
							Match history
						</div>
					</thead>
					<thead>
						<BubbleHeadMatchHistory index={"rank"} user={"user"} name={"name"} stats={"stats"}/>
					</thead>
					<tbody>
						<div className="bubble-component">
							{currentUserMatches.map((match, index) => (
								<BubbleBodyMatchHistory key={index}
														index={index + 1}
														player1={match.player1}
														player2={match.player2}
														score1={match.score1}
														score2={match.score2}
														winner={match.winner}
														currentUser={(match.player1 === cUser || match.player2 === cUser) ? cUser : ""}

								/>
							))}
						</div>
					</tbody>
				</table>
			</div>
		</div>
	);
}
