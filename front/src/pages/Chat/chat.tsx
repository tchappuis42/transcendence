import { useEffect, useState } from "react";
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

const Chat = () => {
	const [userInChannel, setUserInChannel] = useState<Account[]>([]);
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentChannel, setCurrentChannel] = useState("");
	const [pass, setPass] = useState(""); // a voir chmager le nom
	const [DM_Chann, setDM_Chann] = useState(true); //changer les nom
	const socket = useSocket();
	const { account } = useAccount();

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
				alert(name)
				setCurrentChannel(name)
				setDM_Chann(false)
				setUser(user);
			});
			socket.on("setUserInChannel", (user) => {
				setUser(user);
			})
			socket.on("checkPass", (name, datta, user) => {
				setPass(datta);
				if (datta === "ok") {
					socket.emit("message", "", name, '1');
				}
				else {
					setUserInChannel([])
					setCurrentChannel("create a channel!")
				}
				setMessages([]);
				setUser(user);
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

	const setUser = (user: Account[]) => {
		const withoutMe = user.filter(user => user.id !== account.id)
		setUserInChannel(withoutMe);
	}

	function takeChan(channelSet: string, chanStatus: string) {
		setCurrentChannel(channelSet)
		console.log("chann = , current =", channelSet, currentChannel)
		if (socket) {
			socket.emit("getChannelMeOne", channelSet, currentChannel);
			setPass("ok")
			setData("");
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

	return (
		<div className="w-full flex justify-center items-center h-[900px] p-10"> {/*div prinsipale*/}
			<div className="hidden md:flex h-full w-2/5 xl:w-[30%] flex flex-col justify-between p-5 bg-black/80 rounded-l-md">
				<CreateChannel currentChannel={currentChannel} />
				<div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md ">
					<Channels takeChan={takeChan} currentChannel={currentChannel} setMessages={setMessages} userInChannel={userInChannel} />
				</div>
				<div className="w-full h-[40%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
					<DirectMessage takeChan={takeDMChan} currentChannel={currentChannel} />
				</div>
			</div>
			<ChatBoard currentChannel={currentChannel} messages={messages} pass={pass} DM_Chann={DM_Chann} data={data} setData={setData} />
			<div className="hidden xl:flex h-full w-2/5 xl:w-[30%] flex flex-col justify-between p-5 bg-black/80 rounded-r-md">
				<div className="h-[10%]"></div>
				<div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
					<UserInChannel userInChannel={userInChannel} />
				</div>
				<div className="w-full h-[40%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
					<FriendsChat currentChannel={currentChannel} />
				</div>
			</div>
		</div>
	);

};
export default Chat;