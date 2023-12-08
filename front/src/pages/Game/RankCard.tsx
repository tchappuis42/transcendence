import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../Friend/interface/Tools";
import AvatarContainer from "../HomePage/CardContent/avatarContainer";

interface Rank {
	id: number,
	username: string,
	score: number
	avatar : string
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
			<div className="flex w-2/12 justify-center items-center">
				<h1>{id}</h1>
			</div>
			<div className="w-5/12 h-full flex flex-row items-center p-1 ">
				<div className="flex flex-row w-1/4  justify-center items-center  mr-4">
					<AvatarContainer src={rank.avatar} navigation={true} id={rank.id} square={10}/>
				</div>
				<div className="flex flex-row w-2/4 justify-center items-center">
					{rank.username.length <= 9 ? (
						<h1>{rank.username}</h1>
					):(
						<h1>{rank.username.slice(0,9)}.</h1>
					)}
				</div>
			</div>
			<div className="w-3/12 flex justify-center items-center">
				<h1>{rank.score}</h1>
			</div>
		</div>
	);
};

export default RankCard