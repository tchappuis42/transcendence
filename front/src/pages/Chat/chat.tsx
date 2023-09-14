import "./style.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";



interface Message {
	text: string;
	id: string;
}

const Chat = () => {
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
			});
		}
		
		return () => {
			if (socket) {
				socket.off("message");
			}
		};

	}, [socket]);

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("message", data);
			setData("");
		}
	};

	

	return (
		<div className="signup">
			<form onSubmit={sendMessage} id="chat">
				<div className="lol">
					{messages.map((msg, index) => (
						<b className="b" key={index}>
							{msg.id} : {msg.text}
						</b>
					))}
				</div>
				<label htmlFor="text">
					<input
						type="text"
						name="data"
						onChange={(e) => setData(e.target.value)}
						placeholder="Type your messsage..." value={data}
					/>
					<button type="submit" className="button">
						send
					</button>
				</label>
			</form>
		</div>
	);
};
export default Chat;
