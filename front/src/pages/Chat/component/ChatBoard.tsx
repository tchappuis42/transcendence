import { useSocket } from '../../../ui/organisms/SocketContext';
import { useAccount } from '../../../ui/organisms/useAccount';
import { handleMouseEnter, handleMouseLeave } from '../../HomePage/Tools';
import Message from '../interface/messageDto';
import MessageChatCard from './MessageChatCard';
import { SyntheticEvent, useEffect, useState } from "react";
import "./card.css"

interface Props {
	currentChannel: string;
	messages: Message[]
	pass: string;
	DM_Chann: boolean;
	data: string;
	setData: React.Dispatch<React.SetStateAction<string>>;
	DMChanName: string;
}

interface PropsTyping {
	userTyping: string;
}

const TypingBubble = ({ userTyping }: PropsTyping) => {
	return (
		<div className="typing">
			<div className="typing__dot"></div>
			<div className="typing__dot"></div>
			<div className="typing__dot"></div>
		</div>

	);
};

const ChatBoard: React.FC<Props> = ({ currentChannel, messages, pass, DM_Chann, data, setData, DMChanName }) => {
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
			return (DMChanName)
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

	const handleKeyPress = (e: any) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			sendMessage(e);
		}
	};

	return (
		<div className="h-full">  {/*div du centre en bleu*/}
			<div className="h-[10%] flex justify-center items-center">
				<h1 className="text-black/40 text-3xl font-semibold">{getUserName(currentChannel)}</h1>
			</div>
			<div className="h-[90%] grid"
				style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
				<div className='"w-full h-full row-span-6 border rounded-t'>
					<div className="w-full h-full bg-white/80 hover:snap-y rounded-t pt-2 snap-mandatory overflow-y-auto">
						<div className="">
							{messages.map((msg, index) => (
								<MessageChatCard key={JSON.stringify(msg)} msg={msg} index={index} />
							))}
							<div className='px-3 py-5'>
								{userTyping ? <TypingBubble userTyping={userTyping} /> : null}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full h-full row-span-1 bg-gray-100/60 border">
					<form onSubmit={sendMessage} className="h-full">
						<label htmlFor="text" className="w-full h-full grid grid-rows-1">
							<div className='w-full grid grid-cols-5 gap-5 flex items-center px-5'>
								<textarea
									className="col-span-4 chat-bubble-component"
									name="data"
									onChange={(e) => setData(e.target.value)}
									onKeyPress={handleKeyPress}
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
						</label>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChatBoard;