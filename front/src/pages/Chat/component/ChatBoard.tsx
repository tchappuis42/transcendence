import { useSocket } from '../../../ui/organisms/SocketContext';
import { handleMouseEnter, handleMouseLeave } from '../../HomePage/Tools';
import Message from '../interface/messageDto';
import MessageChatCard from './MessageChatCard';
import { SyntheticEvent, useEffect, useState } from "react";

interface Props {
	currentChannel: string;
	messages: Message[]
	pass: string;
	DM_Chann: boolean;
}

const ChatBoard: React.FC<Props> = ({ currentChannel, messages, pass, DM_Chann }) => {

	const [data, setData] = useState("");
	const [userTyping, setUserTyping] = useState("");
	const [Timer, setTimer] = useState(0);

	const socket = useSocket();

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (data) {
			if (currentChannel !== "create a channel!" && pass !== "ko") {
				if (socket) {
					if (DM_Chann) {
						socket.emit("message", data, currentChannel, '0');
						setData("");
					}
					else {
						socket.emit("DMmessage", data, currentChannel, '0')
						setData("");
					}
				}
			}
		}
	};

	function Typing() {
		setTimer(1);
		if (currentChannel !== "create a channel!" && Timer === 0)
			socket?.emit("Typing", currentChannel);
		if (data === "")
			setTimer(0);
	}

	function sendOk() {
		setTimer(0);
	}

	useEffect(() => {
		if (socket) {
			socket.on("isTyping", (msg) => {
				setTimeout(() => {
					setUserTyping("")
				}, 5000);
				setUserTyping(msg);
			});
		}
		return () => {
			if (socket) {
				socket.off("isTyping");
			}
		};
	}, [socket, currentChannel]);

	return (
		<div className="w-full h-full md:w-3/5 xl:[w-40%]">  {/*div du centre en bleu*/}
			<div className="h-[10%] rounded-md md:rounded-none md:rounded-r-md xl:rounded-none w-full bg-black/80 flex justify-center items-center">
				<h1 className="text-white text-3xl font-semibold">{currentChannel.split("_")[0]}</h1>
			</div>
			<div className="w-full h-[90%] shadow-md shadow-white border-2 border-white rounded-md">
				<div className="w-full h-5/6 bg-black/60 overflow-y-auto p-5 shadow-md shadow-white">
					{messages.map((msg, index) => (
						<MessageChatCard msg={msg} index={index} />
					))}
				</div>
				<div className="w-full h-1/6  flex justify-center items-center bg-black/60 rounded-md">
					<form onSubmit={sendMessage} className=" flex w-2/3 h-full justify-center items-center">
						<label htmlFor="text" className="flex flex-col w-4/5">
							<h1 className="text-white">{userTyping}</h1>
							<textarea
								className="h-12 pl-2 resize-none rounded-md"
								name="data"
								onChange={(e) => setData(e.target.value)}
								placeholder="Type your message..."
								value={data}
								style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}
								onInput={Typing}
							/>
							<button type="submit" disabled={pass === 'ko' ? true : false} className="shadow-md shadow-white  mt-4 rounded hover:bg-white"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								onClick={sendOk}>
								<h1 className="text-white hover:text-black">Send</h1>
							</button>
						</label>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChatBoard;