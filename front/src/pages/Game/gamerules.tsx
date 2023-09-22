import { useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";

const GameRules = () => {
	const socket = useSocket();
	const [rules, setRules] = useState(true)
	const Rules = () => {
		setRules(false)
		if (socket)
			socket.emit("action", "ready")
	};

	return <div>
		{rules &&
			<div className='rules'>
				<h1>Rules</h1>
				<p>blablabla</p>
				<p>blablabla</p>
				<span onClick={Rules}>ready</span>
			</div>
		}
	</div>
};
export default GameRules;