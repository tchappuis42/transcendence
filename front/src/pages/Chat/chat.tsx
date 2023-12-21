import { SetStateAction, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import FriendsChat from "./component/FriendsChat";
import { Account } from "../../ui/types";
import UserInChannel from "./component/UserInChannel";
import Channels from "./component/Channels";
import DirectMessage from "./component/DirectMessage"
import CreateChannel from "./component/CreateChannel";
import ChatBoard from "./component/ChatBoard";
import Message from "./interface/messageDto";
import { useAccount } from "../../ui/organisms/useAccount";
import InvitGameMsg from "./component/InvitGameMsg";
import { useNavigate } from "react-router-dom";
import "./chat.css"

const Chat = () => {
	const [userInChannel, setUserInChannel] = useState<Account[]>([]);
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentChannel, setCurrentChannel] = useState("");
	const [pass, setPass] = useState(""); // a voir chmager le nom
	const [DM_Chann, setDM_Chann] = useState(true); //changer les nom
	const socket = useSocket();
	const { account } = useAccount();
	const navigate = useNavigate();

	useEffect(() => {
		if (socket) {
			socket.emit("getAllChannels")
			socket.emit("refreshDMChannel")
		}
	}, [socket]);

	useEffect(() => {
		if (socket) {
			socket.on("message", (data, name, id) => {
				setMessages((prevMessages) => [
					...prevMessages,
					{ message: data, username: name, uId: id }
				]);
			});
		}

		return () => {
			if (socket) {
				socket.off("message");
			}
		};

	}, [socket]);

	useEffect(() => {
		if (!currentChannel) {
			setCurrentChannel("create a channel!")
		}
		if (socket) {
			socket.on("getChannelMeOne", (Id, lol, datta, owner) => {
				setDM_Chann(true)
			});
			socket.on("getDMChannelMe", (name, status, user) => {
				setCurrentChannel(name)
				setDM_Chann(false)
				setUser(user);
			});
			socket.on("setUserInChannel", (user) => {
				setUser(user);
			})
			socket.on("checkPass", (name, datta, curChan) => {
				setteurPass(datta);
				//setPass(datta);
				if (datta === "ok") {
				//	socket.emit("message", "", name, '1');
					console.log("masi looooooooooooool")
					socket.emit("getChannelMeOne", name, curChan);
					setPass("ok")
					setData("");
				//	socket.emit("message", "", name, '1');
				}
				else {
					setUserInChannel([])
					setCurrentChannel("create a channel!")
				}
				setMessages([]);
			});
			socket.on("trans", (data) => {
				socket.emit("refreshDMChannel")
			});
			socket.on("createDMChannel", () => {
				setMessages([]);
			});
			/*socket.on("deleteChannel", (data) => {
				setChannels(data);
				if (data.length !== 0){
					setCurrentChannel(data[0].name)
					socket.emit("message", data, data[0].name, '1');
				//	setCurrentChannel(data[((data.length) - 1)].name);
				}
				else {
					setCurrentChannel("create a channel!")
					setMessages([]);
				}
			});*/
			socket.on("deleteChannelForAllUser", (data) => {
				setCurrentChannel("create a channel!");
				setMessages([]);
			});
			socket.on("messages", (data) => {
				setMessages(data)
				console.log(socket)
			});
			socket.on("banUser", (channelName) => {
				if (socket) {
					socket.emit("getChannelMeOne", channelName, channelName)
					setMessages([]);
				}
			});
			socket.on("game", (data) => {
				if (typeof data === 'object') {
					navigate("/pong")
				}
			});
		}
		return () => {
			if (socket) {
				socket.off("getChannelMeOne");
				//	socket.off("deleteChannel");
				socket.off("messages");
				socket.off("deleteChannelForAllUser");
				socket.off("checkPass");
				socket.off("banUser");
				socket.off("trans");
				socket.off("getDMChannelMe");
				socket.off("setUserInChannel");
				socket.off("createDMChannel");
				socket.off("game");
			}
		};
	}, [socket, data, currentChannel]);

	const setUser = (user: Account[]) => {
		const withoutMe = user.filter(user => user.id !== account.id)
		setUserInChannel(withoutMe);
	}

	function takeChan(channelSet: string, chanStatue: string) {
		console.log("set data a 0 pd")
		setCurrentChannel(channelSet)
		//console.log("chann = , current =", channelSet, currentChannel)
		if (chanStatue !== "Public") {
			console.log("fdp")
			const password = prompt("what is the PassWord?");//todo enlever le prompt;
			if (socket)
				socket.emit("checkPass", channelSet, password, currentChannel);
		}
		setTimeout(() => {}, 1000);
		if (chanStatue === "Public") {	
			if (socket) {
				socket.emit("getChannelMeOne", channelSet, currentChannel);
				setPass("ok")
				setData("");
			}
		}
	}

	function takeDMChan(channelSet: string) {
		setCurrentChannel(channelSet)
		if (socket) {
			socket.emit("getDMChannelMe", channelSet, currentChannel);
			setPass("ok")
			setData("");
		}
	}

	function setteurPass(passe: SetStateAction<string>) {
		setPass(passe);
	}
	return (
		<div className="grid grid-cols-2 grid-row-1 main-page sm:px-5 lg:px-20 xl:px-30 2xl:px-40 3xl:px-40 sm:grid-cols-2 xl:grid-cols-8"> {/*div prinsipale*/}
			<div className="chat-side-bar-component min-w-[300px]" style={{gridTemplateRows: "repeat(8, minmax(0, 1fr))"}}>
				<CreateChannel currentChannel={currentChannel} />
				<div className="row-span-4">
					<Channels takeChan={takeChan} currentChannel={currentChannel} setMessages={setMessages} userInChannel={userInChannel} />
				</div>
				<div className="row-span-3">
					<DirectMessage takeChan={takeDMChan} currentChannel={currentChannel} />
				</div>
			</div>
			<div className="col-span-4 min-h-[800px] bg-gray-100/60">
				<ChatBoard currentChannel={currentChannel} messages={messages} pass={pass} DM_Chann={DM_Chann} data={data} setData={setData} />
			</div>
			<div className="chat-side-bar-component min-w-[300px]" style={{gridTemplateRows: "repeat(8, minmax(0, 1fr))"}}>				
				<InvitGameMsg />
				<div className="row-span-4">
					<UserInChannel userInChannel={userInChannel} />
				</div>
				<div className="row-span-3">
					<FriendsChat currentChannel={currentChannel} />
				</div>
			</div>
		</div>
	);

};
export default Chat;