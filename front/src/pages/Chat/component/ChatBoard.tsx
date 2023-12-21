import { useSocket } from '../../../ui/organisms/SocketContext';
import { useAccount } from '../../../ui/organisms/useAccount';
import { handleMouseEnter, handleMouseLeave } from '../../HomePage/Tools';
import Message from '../interface/messageDto';
import MessageChatCard from './MessageChatCard';
import { SetStateAction, SyntheticEvent, useEffect, useState } from "react";

interface Props {
	currentChannel: string;
	messages: Message[]
	pass: string;
	DM_Chann: boolean;
	data: string;
	setData: React.Dispatch<React.SetStateAction<string>>
}

const ChatBoard: React.FC<Props> = ({ currentChannel, messages, pass, DM_Chann, data, setData }) => {
	const [userTyping, setUserTyping] = useState("");
	const [Timer, setTimer] = useState(0);
	const { account } = useAccount();

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

	const getUserName = (name: string) => {
		if (!DM_Chann) {
			const users = name.split("_");
			if (users[0] !== account.username)
				return users[0];
			if (users[1] !== account.username)
				return users[1];
			return ("")
		}
		return name
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
				<h1 className="text-white text-3xl font-semibold">{getUserName(currentChannel)}</h1>
			</div>
			<div className="w-full h-[90%] shadow-md shadow-mdborder-2 border-white rounded-md">
				<div className="w-full h-5/6 bg-black/60 overflow-y-auto p-5 shadow-md shadow">
					{messages.map((msg, index) => (
						<MessageChatCard msg={msg} index={index} />
					))}
				</div>
				<div className="w-full h-1/6 flex justify-center items-center bg-black/60 rounded-md">
					<form onSubmit={sendMessage} className="flex w-2/3 h-full justify-center items-center">
						<label htmlFor="text" className="grid grid-cols-6 grid-rows-2 w-full gap-4">
							<textarea
								className="col-span-4 h-12 p-2 pt-2.5 resize-none rounded-md"
								name="data"
								onChange={(e) => setData(e.target.value)}
								placeholder="Type your message..."
								value={data}
								style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}
								onInput={Typing}
							/>
							<button type="submit" disabled={pass === 'ko' ? true : false} className="col-span-1 h-12 shadow-md shadow-md rounded hover:bg-black/40 border hover:no-underline"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								onClick={sendOk}>
								<h1 className="text-white hover:text-white">Send</h1>
							</button>
							<h1 className="span-rows-1 col-span-1 h-12 text-white rounded">{userTyping}</h1>
						</label>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChatBoard;