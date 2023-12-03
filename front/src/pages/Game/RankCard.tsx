import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../Friend/interface/Tools";

interface Rank {
	id: number,
	username: string,
	score: number
}

const RankCard: React.FC<{ rank: Rank, id: number }> = ({ rank, id }) => {

	const navigate = useNavigate();


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
			onClick={() => handleNav(rank.id)}>
			<h1>{id}</h1>
			<h1>{rank.username}</h1>
			<h1>{rank.score}</h1>
		</div>
	);
};

export default RankCard