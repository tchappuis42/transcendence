import * as React from "react"
import "./leaderboard.css"
import "../styleProfilPage/mainCSS.css"
import {BubbleHeadLeaderboard, BubbleBodyLeaderboard} from "./leaderboardInfo/leaderboardComponent"
import {BubbleHeadMatchHistory, BubbleBodyMatchHistory, MatchHistory} from "./leaderboardInfo/matchHistoryComponent"
import {useEffect, useState} from "react";
interface Player {
	user: string;
	name: string;
	stats: number;
}

interface Match {
	user: string;
	player2: string;
	score1: number;
	score2: number;
	winner: string;
}

export const GetHistoricalMatch = (bubbleData: Player[]): Match[] => {
	let matches: Match[] = [];
	for (let i = 0; i < bubbleData.length; i++) {
		for (let j = i + 1; j < bubbleData.length; j++) {
			let user = bubbleData[i];
			let player2 = bubbleData[j];
			let score1 = Math.round((user.stats * Math.random() * 10) % 10);
			let score2 = Math.round((player2.stats * Math.random() * 10) % 10);
			let winner;
			if (score1 > score2)
				winner = user;
			else
				winner = player2;
			matches.push({
				user: user.user,
				player2: player2.user,
				score1: score1,
				score2: score2,
				winner: winner.user
			});
		}
	}
	return (matches);
}
export const Leaderboard = () => {
	const [currentUser, setCurrentUser] = useState<Player | null>(null);
	const cUser: "ieie" = "ieie";
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
	const findUser = (username: string): void => {
		const user = bubbleData.find(player => player.user === username);
		setCurrentUser(user ? user : null);
	}

	useEffect((): void => {
		findUser(cUser);
	}, [cUser]);
	const matches: Match[] = GetHistoricalMatch(bubbleData);

	const currentUserMatches = matches.filter(match => match.user === currentUser?.user || match.player2 === currentUser?.user);

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
							{currentUserMatches.map((match, index) => (
								<BubbleBodyMatchHistory className={match.user === "ieie" ? "bg-blue-200" : undefined}
									key={index}
									index={index + 1}
									player1={match.user}
									player2={match.player2}
									score1={match.score1}
									score2={match.score2}
									winner={match.winner}
									// currentUser={match.user === cUser}
								/>
							))}
						</div>
					</tbody>
				</table>
			</div>
		</div>
	);
}
