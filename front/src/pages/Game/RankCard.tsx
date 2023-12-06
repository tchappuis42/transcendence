import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../Friend/interface/Tools";

interface Rank {
	id: number,
	username: string,
	score: number
	avatar : string
}

const RankCard: React.FC<{ rank: Rank, id: number }> = ({ rank, id }) => {

	const navigate = useNavigate();
	console.log("rank :", rank)


	const handleNav = (id: number) => {
		navigate("/profil", {
			state: {
				id: id
			}
		})
	}

	function background(id: number) {
		if (id % 2)
			return 'rgba(169, 169, 169, 0.5)';
		return 'rgba(169, 169, 169, 0.3)'
	}

	return (
		<div className="h-1/5 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			// TODO ya pas de rank.id
			onClick={() => handleNav(rank.id)}>
			<div className="flex w-3/12 justify-center items-center">
				<h1>{id}</h1>
			</div>
			<div className="w-5/12 h-full flex flex-row p-2">
				<div className="flex flex-row w-2/4  justify-center items-center">
					<img src={rank.avatar} alt="profil pic" className="h-full mr-10" />
				</div>
				<div className="flex flex-row w-2/4 items-center">
					<h1>{rank.username}</h1>
				</div>
			</div>
			<div className="w-3/12 flex justify-center items-center">
				<h1>{rank.score}</h1>
			</div>
		</div>
	);
};

export default RankCard