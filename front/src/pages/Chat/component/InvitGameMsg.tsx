import { useEffect, useState } from "react";
import { useSocket } from "../../../ui/organisms/SocketContext";

const InvitGameMsg = () => {
	const [errorMsg, setErrorMsg] = useState<string>("");
	const socket = useSocket();

	useEffect(() => {
		if (socket) {
			socket.on("GameInvit", (data) => {
				if (typeof data === 'number') {
					setTimeout(() => {
						setErrorMsg("")
					}, 4000);
					setErrorMsg("impossible de creer une invitation de game, vous etes deja en partie ou en recherche de partie")
				}
			});
			socket.on("JoinGame", (data) => {
				if (typeof data === 'number') {
					setTimeout(() => {
						setErrorMsg("")
					}, 4000);
					setErrorMsg("invitation de jeu expirée")
				}
			});
		}
		return () => {
			if (socket) {
				socket.off("GameInvit");
				socket.off("JoinGame");
			}
		};
	}, [socket]);

	return (
		<div className="h-[10%]">
			{errorMsg &&
				<div className="bg-white p-4 text-red-500">{errorMsg}</div>
			}
		</div>
	);
};

export default InvitGameMsg;