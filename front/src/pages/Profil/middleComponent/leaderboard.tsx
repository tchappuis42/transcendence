import * as React from "react"
import "./leaderboard.css"
import "../styleProfilPage/mainCSS.css"
import {BubbleHeadLeaderboard, BubbleBodyLeaderboard} from "./leaderboardInfo/leaderboardComponent"
import {BubbleHeadMatchHistory, BubbleBodyMatchHistory} from "./leaderboardInfo/matchHistoryComponent"
import {useEffect, useState} from "react";
import {UserStatus} from "../tools/userStatus";
import {useAccount} from "../../../ui/organisms/useAccount";
import {RankUsers} from "../tools/rank";
import axios from "axios"

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

interface User {
	id: number;
	username: string;
  }
  
  interface LeaderboardProps {
	user: User | undefined;
  }

interface gameHistory {
	scoreOne : number;
	scoreTwo : number;
	userOne : string;
	userTwo : string;
	winner : string;
}
  
  export const Leaderboard: React.FC<LeaderboardProps> = ({ user }) => {
	const {account} = useAccount();
	const { userRank, myRank, myIndex} = RankUsers();
	const [history, setHistory] = useState<gameHistory[]>();


	useEffect(() => {
		if (user?.id) {
			const getHistory = async () => {
				try {
					console.log("user.id in leaderborad : ", user?.id)
					const response = await axios.get(`http://localhost:4000/game/history/${user?.id}`);
					console.log("jambon",response.data);
					setHistory(response.data)
				} catch (error) {
					console.error("Erreur lors de la récupération des scores :", error);
				}
			}
			getHistory();
		}
	}, [user])
	
	return (
		<div className="z-10 middle-component-main">
			
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
								userRank.map((u, index, id) => <BubbleBodyLeaderboard
												key={index}
												index={index + 1}
												stats={u.score}
												name={u.username}
												user={0}
												// ça fonctionne mais check par username et non id...
												className={u.username === user?.username ? "bg-blue-200" : undefined}
										/>
								)
							}
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
							{history?.map((match, index) => (
							 <BubbleBodyMatchHistory key={index}
											index={index + 1}
													player1={match.userOne}
													player2={match.userTwo}
													score1={match.scoreOne}
													score2={match.scoreTwo}
													winner={match.winner}
													currentUser={(match.userOne === account.username || match.userTwo === account.username) ? account.username : ""}
							/>
							))}
						</div>
					</tbody>
				</table>
			</div>
		</div>
	);
}

