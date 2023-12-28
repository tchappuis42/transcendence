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
	// h-1/5 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center
	// flex justify-between p-3 items-center h-full object-cover
	// flex fle-row justify-evenly items-center h-full
	// flex justify-between p-2 items-center h-full
	return (
		<div className="main-card grid grid-cols-7"
			style={{ background: background(match.winnerId) }}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			>
			<div id={"pongHistory"}className="col-span-3 object-cover h-full w-full grid grid-cols-2">
				<div className="max-w-[1/3]" style={{objectFit: "cover", overflow: "hidden"}}>
					<AvatarContainer src={match.avatarOne} navigation={false} square={10} id_div={"pongHistory"}/>
				</div>
				<div className="group-matchHistory-card max-w-[2/3]">
					{match.userOne.length <= 15 ? (
						<h1 className="text-matchHistory-card">{match.userOne}</h1>
						) : (
						<h1 className="text-matchHistory-card ">{match.userOne.slice(0,15)}.</h1>
					)}
				</div>
			</div>
			<div className="group-matchHistory-card">
				<div className="text-matchHistory-card text-base font-bold">{match.scoreOne} - {match.scoreTwo}</div>
			</div>
			<div id={"history"} className="col-span-3 grid grid-cols-2 w-full">
				<div className="group-matchHistory-card max-w-[2/3]">
					{match.userTwo.length <= 15 ? (
						<h1 className="text-matchHistory-card">{match.userTwo}</h1>
						) : (
						<h1 className="text-matchHistory-card">{match.userTwo.slice(0,15)}.</h1>
					)}
				</div>
				<div className="max-w-[1/3]" style={{objectFit: "cover", overflow: "hidden"}}>
					<AvatarContainer src={match.avatarTwo} navigation={false} square={10} id_div="history"/>
				</div>
			</div>
		</div>
	);
};

export default MatchHistoryCard