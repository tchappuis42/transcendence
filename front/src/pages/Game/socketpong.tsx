import { SyntheticEvent, useEffect, useState } from "react";

import { useAccount } from "../../ui/organisms/useAccount";

const SocketPong = () => {
	/*const socket = useSocket();
	const { account } = useAccount();
	const [page, setPage] = useState(false);
	const [player1, setplayer1] = useState("");
	const [player2, setplayer2] = useState("");
	const [score1, setscore1] = useState(0);
	const [score2, setscore2] = useState(0);

	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				console.log(data);
				setPage(true);
				setplayer1(data.player1);
				setplayer2(data.player2);
			});
			socket.on("gamelife", (data) => {
				if (data === player1)
					setscore1(prevscore => prevscore + 1);
				else
					setscore2(prevscore => prevscore + 1);
			});
		}

		return () => {
			if (socket) {
				socket.off("matchmaking");
			}
		};
	}, [socket]);

	const matchmaking = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("matchmaking");
		}
	};

	const incrementScore = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("gamelife");
		}
	};

	return (
		<div className="signup">
			{!page &&
				<button onClick={matchmaking} className="button">
					trouver un match
				</button>
			}
			{page &&
				<div className="text">
					{player1} vs {player2}
					{score1} - {score2}
					<button onClick={incrementScore}>+1</button>
				</div>
			}
		</div>
	);*/
	return <div>salut</div>
};

export default SocketPong;