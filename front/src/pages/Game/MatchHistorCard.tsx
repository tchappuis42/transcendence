interface Match {
	userOne: string;
	userTwo: string;
	scoreOne: number;
	scoreTwo: number;
	winnerId: number;
}

const MatchHistoryCard: React.FC<{ match: Match, userId: number }> = ({ match, userId }) => {

	function background(id: number) {
		if (id === userId)
			return 'rgba(0, 200, 0, 0.5)';
		return 'rgba(200, 0, 0, 0.5)'
	}

	return (
		<div className="h-1/5 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center"
			 style={{ background: background(match.winnerId) }}>
			<h1>{match.userOne}</h1>
			<h1>{match.scoreOne}</h1>
			<h1>-</h1>
			<h1>{match.scoreTwo}</h1>
			<h1>{match.userTwo}</h1>
		</div>
	);
};

export default MatchHistoryCard