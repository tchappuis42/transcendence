import * as React from "react"
import axios from "axios";
import "../leaderboard.css"
import "../../styleProfilPage/mainCSS.css"
import {useEffect, useState} from "react";
/*className={match.user === "ieie" ? "bg-blue-200" : undefined}
									key={index}
									Match={index + 1}
									player1={match.user}
									player2={match.player2}
									score1={match.score1}
									score2={match.score2}
									winner={match.winner}*/
interface Props {
	className: string | undefined;
	index: number;
	player1: string;
	player2: string;
	score1: number;
	score2: number;
	winner: string;
	currentUser: string;
}

interface PropsHead {
	index: string;
	user: string;
	name: string;
	stats: string;
}

interface Color {
	currentUser: string
	player1: string;
	player2: string;
	winner: string;
}
export const MatchHistory = () => {

	const [matchs, setMatchs] = useState<string[]>([]);

	useEffect(() => {
		const getHistory = async () => {
			try {
				const response = await axios.get("http://localhost:4000/game/history", { withCredentials: true });
				setMatchs(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération de l'historique des matchs :", error);
			}
		}
		getHistory();
	}, []);

	const add = () => { //debug
		setMatchs([...matchs, "test de test"])
		//setMatchs([])
	}

	//<span onClick={add}> add</span>  <h1>Match history</h1>
	//bg-white/50 rounded-3xl p-4 sm:h-60 md:w-[59%] md:h-80 md:mt-px xl:w-[708px]
	return (
		<div style={{}} >
			{matchs.length === 0 && // si y-a pas de match
				<h1 className="text-center font-bold">pas de match</h1>}
			{matchs.map(match => <div className="text-center text-xl">{match}</div>)}
		</div>
	);
}

export const SetColor = ({winner, currentUser, player1, player2}: Color) => {
	const [color, setColor] = useState("");

	useEffect(() => {
		const rankColor = () => {
			if (currentUser === winner)
				setColor("gold");
			else if (currentUser !== winner)
				setColor("blue");
			else if (player1 !== currentUser && player1 === winner)
				setColor("gold");
			else if (player2 !== currentUser && player2 === winner)
				setColor("gold");
		}
		rankColor();
	}, [winner, player1, player2, currentUser]);
}
export const BubbleHeadMatchHistory = ({user, name, stats}: PropsHead) => {
	return (
		<tr>
			<div className="bubble-main black-border-fine bg-gray-200">
				<td className="col-span-1">
					<div className="bubble-row justify-center">{user}</div>
				</td>
				<td className="col-span-1">
					<div className="bubble-row justify-start">{user}</div>
				</td>
				<td className="col-span-1 flex justify-center">
					<div className="bubble-row justify-center">{name}</div>
				</td>
				<td className="col-span-1">
					<div className="bubble-row justify-end px-2">{stats}</div>
				</td>
			</div>
		</tr>
	);
}

export const BubbleBodyMatchHistory = ({index, className, score1, score2, player1, player2, winner}: Props) => {
	if (player1 === winner)

	return (
		<tr className={className}>
			<div className={`${className} bubble-main black-border-fine snap-start`}>
				<td className="col-span-1">
					<div className="bubble-row justify-center">{index}</div>
				</td>
				<td className="col-span-1">
					<div className="bubble-row justify-start">{player1}</div>
				</td>
				<td className="col-span-2 flex justify-center">
					<div className="bubble-row justify-center">{score1} - {score2}</div>
				</td>
				<td className="col-span-1 flex justify-center">
					<div className="bubble-row justify-start">{player2}</div>
				</td>
				<td className="col-span-1">
					<div className="bubble-row justify-center bg-amber-100">{winner}</div>
				</td>
			</div>
		</tr>
	);
}
