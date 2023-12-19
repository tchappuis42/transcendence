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
import { SimpleRegistrationForm } from "./component/stylePopUP";

const Chat = () => {
	const [userInChannel, setUserInChannel] = useState<Account[]>([]);
	const [showAuthWindow, setShowAuthWindow] = useState(false);
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentChannel, setCurrentChannel] = useState("");
	const [pass, setPass] = useState(""); // a voir chmager le nom
	const [DM_Chann, setDM_Chann] = useState(true); //changer les nom
	const socket = useSocket();
	const [showWindow, setShowWindow] = useState(true);

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
				setDM_Chann(false)
				setUserInChannel(user);
			});
			socket.on("setUserInChannel", (user) => {
				setUserInChannel(user);
			})
			socket.on("checkPass", (name, datta, user) => {
				setteurPass(datta);
				//setPass(datta);
				if (datta === "ok") {
					socket.emit("message", "", name, '1');
				}
				else {
					setUserInChannel([])
					setCurrentChannel("create a channel!")
				}
				setMessages([]);
			//	setUserInChannel(user);
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
			}
		};
	}, [socket, data, currentChannel]);

	function takeChan(channelSet: string, chanStatue: string, password?: string) {
		setCurrentChannel(channelSet)
		console.log("chann = , current =", channelSet, currentChannel)
		if (chanStatue !== "Public") {
			// if (currentChannel !== "create a channel!")
			// 	setShowWindow(false)
			console.log("socket: \n", socket);
			// const password = SimpleRegistrationForm();//todo enlever le prompt;
			if (socket)
				socket.emit("checkPass", channelSet, password);
		}
		setTimeout(() => {}, 1000);
		if (pass === "ok" || chanStatue === "Public") {	
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
		<div className="w-full flex justify-center items-center h-[900px] p-10"> {/*div prinsipale*/}
			<div className="hidden md:flex h-full w-2/5 xl:w-[30%] flex flex-col justify-between p-5 bg-black/80 rounded-l-md"> {/*div de gauche en rouge*/}
				<CreateChannel currentChannel={currentChannel} />
				<div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md ">
					<Channels takeChan={takeChan} currentChannel={currentChannel} setMessages={setMessages} userInChannel={userInChannel} promptOpen={showWindow}/>
				</div>
				<div className="w-full h-[40%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
					<DirectMessage takeChan={takeDMChan} currentChannel={currentChannel} />
				</div>
			</div>
			<ChatBoard currentChannel={currentChannel} messages={messages} pass={pass} DM_Chann={DM_Chann} />
			<div className="hidden xl:flex h-full w-2/5 xl:w-[30%] flex flex-col justify-between p-5 bg-black/80 rounded-r-md pt-20">  {/*div de droite en vert*/}
				<div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
					<FriendsChat currentChannel={currentChannel} />
				</div>
				<div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
					<UserInChannel userInChannel={userInChannel} />
				</div>
			</div>
		</div>
	);

};
export default Chat;
