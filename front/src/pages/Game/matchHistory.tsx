import axios from "axios";
import { useEffect, useState } from "react";
import MatchHistoryCard from "./MatchHistorCard";

interface Match {
	userOne: string;
	userTwo: string;
	scoreOne: number;
	scoreTwo: number;
	winnerId: number;
	avatarOne: string;
	avatarTwo: string;
}

const MatchHistory: React.FC<{ userId: number | undefined }> = ({ userId }) => {

	const [matchs, setMatchs] = useState<Match[]>([]);


	useEffect(() => {
		if (userId) {
			const getHistory = async () => {
				try {
					const response = await axios.get(`/api/game/history/${userId}`, { withCredentials: true });
					setMatchs(response.data);
				} catch (error) {
					console.error("Erreur lors de la récupération de l'historique des matchs :", error);
				}
			}
			getHistory();
		}
		if (userId) {
			const getHistory = async () => {
				try {
					const response = await axios.get(`/api/game/history/${userId}`, { withCredentials: true });
					setMatchs(response.data);
				} catch (error) {
					console.error("Erreur lors de la récupération de l'historique des matchs :", error);
				}
			}
			getHistory();
		}
	}, [userId]);

	return (
		<div className="m-card">
			<div className='header-card'>
				<h1>Match history</h1>
			</div>

			{!matchs.length ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
					<h1 className="text-black/70">No match</h1>
				</div>
			) : (

				<div className="h-full m-2.5 rounded-md box-border justify-center items-center overflow-y-auto max-h-[80%] overflow-x-hidden">
					{matchs?.map((match: Match, id: number) => (
						<MatchHistoryCard key={id} match={match} userId={userId} />
					))}
				</div>
			)
			}
		</div>
	);
}

export default MatchHistory;