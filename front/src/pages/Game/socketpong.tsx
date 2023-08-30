import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";


const SocketPong = () => {
	const [data, setData] = useState("")
	const socket = useSocket();


	useEffect(() => {
		if (socket) {
			socket.on("message", (data) => {
				console.log(data);
				alert(data.data);
			});
		}
	}, [socket]);

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			console.log(data)
			socket.emit("message", { data });
		}
	};

	return <div>
		<form onSubmit={sendMessage}>
			<label htmlFor="text">
				<input type="text"
					name="data"
					value={data}
					onChange={e => setData(e.target.value)}
				/>
				<button type="submit" className='button'>send</button>
			</label>

		</form>
	</div>
}
export default SocketPong;