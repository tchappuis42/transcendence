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
		<div className="h-full">  {/*div du centre en bleu*/}
			<div className="h-[10%] flex justify-center items-center">
				<h1 className="text-black/40 text-3xl font-semibold">{getUserName(currentChannel)}</h1>
			</div>
			<div className="h-[90%] grid grid-rows-5">
				<div className="w-full h-full row-span-4 bg-white/60 border overflow-y-scroll ">
					{messages.map((msg, index) => (
						<MessageChatCard msg={msg} index={index} />
					))}
				</div>
				<div className="w-full h-full row-span-1 bg-gray-100/60 border">
					<form onSubmit={sendMessage} className="h-full">
						<label htmlFor="text" className="w-full h-full grid grid-rows-2">
							<div className='w-full grid grid-cols-5 gap-5 flex items-end px-5'>
								<textarea
									className="col-span-4 chat-bubble-component"
									name="data"
									onChange={(e) => setData(e.target.value)}
									placeholder="Type your message..."
									value={data}
									style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}
									onInput={Typing}
								/>
								<button type="submit" disabled={pass === 'ko' ? true : false} className="col-span-1 chat-button"
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
									onClick={sendOk}>
									<h1 className="text-black/60 hover:text-white">Send</h1>
								</button>
							</div>
							<div className='w-full grid grid-cols-1 gap-5 px-5'>
								<h1 className="chat-bubble-component border-transparent item-start text-black">{userTyping}</h1>
							</div>
						</label>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChatBoard;