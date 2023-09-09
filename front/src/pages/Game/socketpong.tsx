import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import { useAccount } from "../../ui/organisms/useAccount";

const SocketPong = () => {
	const socket = useSocket();
	const { account } = useAccount();
	const [page, setPage] = useState(false);
	const [opponent, setOpponent] = useState("");

	useEffect(() => {
		if (socket) {
			socket.on("game", (data) => {
				console.log(data);
				setPage(true);
				setOpponent(data)
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

	return (
		<div className="signup">
			{!page &&
				<button onClick={matchmaking} className="button">
					trouver un match
				</button>
			}
			{page &&
				<div className="text">
					{account.username} vs {opponent}
				</div>
			}
		</div>
	);
};

export default SocketPong;