import axios from "axios";
import { useEffect, useState } from "react";


const MatchHistory = () => {

	const [matchs, setMatchs] = useState([]);

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

	/*const add = () => { //debug
		setMatchs([...matchs, "test de test"])
		//setMatchs([])f
	}*/

	//<span onClick={add}> add</span>  <h1>Match history</h1>
	return (
		<div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Match history</h1>
			</div>
			{/*<div style={{}} className="flex-col justify-center item-center overflow-y-auto h-28 w-full">
				{matchs.length === 0 && // si y-a pas de match
					<h1 className="text-center font-bold">pas de match</h1>}
				{matchs.map(match => <div className="text-center text-xl">{match}</div>)}
			</div>*/}
		</div>
	);
}

export default MatchHistory;