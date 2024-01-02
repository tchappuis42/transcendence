import * as React from "react"
import axios from "axios";
import "../leaderboard.css"
import "../../styleProfilPage/mainCSS.css"
import {useEffect, useState} from "react";

interface Props {
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
	currentUser: string;
	player: string
	winner: string;
}
export const MatchHistory = () => {

	const [matchs, setMatchs] = useState<string[]>([]);

	useEffect(() => {
		const getHistory = async () => {
			try {
				const response = await axios.get("/api/game/history", { withCredentials: true });
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

export const SetColor = ({winner, player, currentUser}: Color): string => {
	if (player === currentUser && player !== winner)
		return("bg-blue-200");
	else if (player === winner)
		return("");
	return("");
}

export const BubbleHeadMatchHistory = ({user, name, stats}: PropsHead) => {
	return (
		<tr>
			<div className="bubble-main black-border-fine bg-gray-200">
				<td className="col-span-1">
					<div className="bubble-row justify-center">{}</div>
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

export const BubbleBodyMatchHistory = ({index, player1, player2, score1, score2, winner, currentUser}: Props) => {
	let colorP1 = SetColor({winner, player: player1, currentUser});
	let colorP2 = SetColor({winner, player: player2, currentUser});

	return (
		<tr>
			<div className={`bubble-main black-border-fine snap-start`}>
				<td className="col-span-1">
					<div className="bubble-row justify-center">{index}</div>
				</td>
				<td className="col-span-1">
					<div className={`bubble-row justify-center ${colorP1}`}>{player1}</div>
				</td>
				<td className="col-span-3 flex justify-center">
					<div className={`bubble-row justify-center`}>{score1} - {score2}</div>
				</td>
				<td className="col-span-1 flex justify-center">
					<div className={`bubble-row justify-center ${colorP2}`}>{player2}</div>
				</td>
			</div>
		</tr>
	);
}
