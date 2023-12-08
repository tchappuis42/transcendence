import { handleMouseEnter, handleMouseLeave } from "../Friend/interface/Tools";
import AvatarContainer from "../HomePage/CardContent/avatarContainer";

interface Match {
	userOne: string;
	userTwo: string;
	scoreOne: number;
	scoreTwo: number;
	winnerId: number;
	avatarOne: string;
	avatarTwo: string;
}

const MatchHistoryCard: React.FC<{ match: Match, userId: number | undefined}> = ({ match, userId }) => {

	function background(id: number) {
		if (id === userId)
			return 'rgba(0, 200, 0, 0.5)';
		return 'rgba(200, 0, 0, 0.5)'
	}

	return (
		<div className="h-1/5 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center"
			style={{ background: background(match.winnerId) }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			>
			<div className=" w-2/6 flex justify-between p-3 items-center h-full ">
				<AvatarContainer src={match.avatarOne} navigation={false} square={10} />
				<div className="w-full h-full flex justify-start pl-2 item-center ">
					{match.userOne.length <= 15 ? (
						<h1 className="text-white flex justify-center items-center">{match.userOne}</h1>
						) : (
						<h1 className="text-white flex justify-center items-center">{match.userOne.slice(0,15)}.</h1>
					)}
				</div>
			</div>
			<div className=" w-2/6 flex fle-row justify-evenly items-center h-full">

				<h1 className="text-white text-xl">{match.scoreOne}</h1>
				<h1 className="text-white">-</h1>
				<h1 className="text-white text-xl">{match.scoreTwo}</h1>
			</div>
			<div className=" w-2/6 flex justify-between p-2 items-center h-full ">
				<div className="w-full h-full flex justify-end pr-3 item-center ">
					{match.userTwo.length <= 15 ? (
						<h1 className="text-white flex justify-center items-center">{match.userTwo}</h1>
						) : (
						<h1 className="text-white flex justify-center items-center">{match.userTwo.slice(0,15)}.</h1>
					)}
				</div>
				<AvatarContainer src={match.avatarTwo} navigation={false} square={10} />
			</div>
		</div>
	);
};

export default MatchHistoryCard