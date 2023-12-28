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
	// h-1/5 bg-white/50 my-5 mx-3 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer
	return (
		<div className="h-1/5 bg-white/50 my-5 mx-3 rounded-md shadow-lg box-border grid grid-cols-4 grid-rows-1 cursor-pointer"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={() => handleNav(rank.id)}>
			<div className="col-span-1 flex justify-center items-center">
				<h1>{id}</h1>
			</div>
			<div className="col-span-2 w-full h-full flex flex-row items-center">
				<div id={"pong"} className="h-full flex flex-row w-1/4 justify-center items-center mr-4 object-cover">
					<AvatarContainer src={rank.avatar} navigation={true} id={rank.id} square={10} id_div={"pong"}/>
				</div>
				<div className="flex flex-row w-2/4 justify-center items-center">
					{rank.username.length <= 9 ? (
						<h1>{rank.username}</h1>
					):(
						<h1>{rank.username.slice(0,9)}.</h1>
					)}
				</div>
			</div>
			<div className="col-span-1 flex justify-center items-center">
				<h1>{rank.score}</h1>
			</div>
		</div>
	);
};

export default RankCard