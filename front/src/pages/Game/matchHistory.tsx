import axios from "axios";
import { useEffect, useState } from "react";


const MatchHistory = () => {

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
	return (
		<div className="bg-white h-48 w-full bg-white/50 rounded-3xl p-4 sm:h-60 md:w-3/5">
			<div className="h-10 text-3xl font-bold text-center">
				<h1>Match history</h1>
			</div>
			<div style={{}} className="flex-col justify-center item-center overflow-y-auto h-28 w-full">
				{matchs.length === 0 && // si y-a pas de match
					<h1 className="text-center font-bold">pas de match</h1>}
				{matchs.map(match => <div className="text-center text-xl">{match}</div>)}
			</div>
		</div>
	);
}

export default MatchHistory;