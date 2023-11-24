import { useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";

interface Test {
	id: number
	status: number
}
const PendingFriend = () => {

	const socket = useSocket()
	const [test, setTest] = useState<Test>()

	useEffect(() => {
		if (socket) {
			socket.on("status", (data) => {
				setTest(data)
			})
		}
		return () => {
			if (socket) {
				socket.off("status");
			}
		};
	}, [socket]);

	return (
		<div className="bg-gray-400">
			pendingFriend
			<div>{test?.status}
			</div>
		</div>
	)
}
export default PendingFriend;