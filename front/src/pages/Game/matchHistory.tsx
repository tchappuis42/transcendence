import axios from "axios";
import { useEffect, useState } from "react";
import MatchHistoryCard from "./MatchHistorCard";

interface Match {
	userOne: string;
	userTwo: string;
	scoreOne: number;
	scoreTwo: number;
	winnerId: number;
}

const MatchHistory: React.FC<{ userId: number }> = ({ userId }) => {

	const [matchs, setMatchs] = useState<Match[]>([]);


	useEffect(() => {
		const getHistory = async () => {
			try {
				const response = await axios.get(`http://localhost:4000/game/history/${userId}`, { withCredentials: true });
				console.log("h data = ", response.data)
				setMatchs(response.data);
			} catch (error) {
				console.error("Erreur lors de la récupération de l'historique des matchs :", error);
			}
		}
		getHistory();
	}, []);

	return (
		<div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Match history</h1>
			</div>

			{!matchs.length ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1 className="text-white">No match</h1>
				</div>
			) : (

				<div className="h-full m-2.5 rounded-md bg-black/10 shadow-md shadow-white box-border justify-center items-center overflow-y-auto max-h-[80%]">
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
