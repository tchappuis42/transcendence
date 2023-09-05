import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";

interface Message {
	text: string;
	id: string;
}

const SocketPong = () => {
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const socket = useSocket();

	useEffect(() => {
		if (socket) {
			socket.on("message", (data, id) => {
				setMessages((prevMessages) => [
					...prevMessages,
					{ text: data, id: id }
				]);
			});

			socket.on("test", (data) => {
				console.log(data);
				alert(data);
			});
		}

		return () => {
			if (socket) {
				socket.off("message");
				socket.off("test");
			}
		};
	}, [socket]);

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("message", data);
		}
		setData("")
	};

	return (
		<div className="signup">
			<form onSubmit={sendMessage} id="chat">
				{messages.map((msg, index) => (
					<b className="b" key={index}>
						{msg.id} : {msg.text}
					</b>
				))}
				<label htmlFor="text">
					<input
						type="text"
						name="data"
						value={data}
						onChange={(e) => setData(e.target.value)}
					/>
					<button type="submit" className="button">
						send
					</button>
				</label>
			</form>
			<button onClick={(e) => socket?.emit("test")}>test</button>
		</div>
	);
};

export default SocketPong;