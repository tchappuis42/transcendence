import "./style.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import React from "react";

import FriendsChat from "./component/FriendsChat";
import { Account } from "../../ui/types";
import { useLocation } from 'react-router-dom';
import UserInChannel from "./component/UserInChannel";
import Channels from "./component/Channels";
import DirectMessage from "./component/DirectMessage"

import { useAccount } from "../../ui/organisms/useAccount";
import { handleMouseEnter, handleMouseLeave } from "../Friend/interface/Tools";
import MessageChatCard from "./component/MessageChatCard";
import CreateChannel from "./component/CreateChannel";

interface Message { //mettre dans un fichier
	message: string;
	username: string;
	uId: number
}

enum Owner {
	user = 0,
	owner = 1,
	admin = 2
}

const Chat = () => {
	const [userInChannel, setUserInChannel] = useState<Account[]>([]);
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentChannel, setCurrentChannel] = useState("");
	const [pass, setPass] = useState(""); // a voir chmager le nom
	const [DM_Chann, setDM_Chann] = useState(true); //changer les nom
	const socket = useSocket();

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
				//setdis(false);
				setteur(user);
				//setUserInChannel(user);
			});
			socket.on("setUserInChannel", (user) => {
				setteur(user);
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
				setteur(user);
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

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log("DM_chann : ", DM_Chann)
		console.log("pass ==", pass)

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

	function setteur(user: any) {
		setUserInChannel(user);
	}

	function takeChan(channelSet: string) {
		console.log("takechanel")
		setCurrentChannel(channelSet)
		console.log("chann = , current =", channelSet, currentChannel)
		if (socket) {
			socket.emit("getChannelMeOne", channelSet, currentChannel);
			setPass("ok")
			//setMessages([]);
			console.log("in if")
		}
	}

	function takeDMChan(channelSet: string) {
		setCurrentChannel(channelSet)
		if (socket) {
			socket.emit("getDMChannelMe", channelSet, currentChannel);
			setPass("ok")
			//setMessages([]);
		}
	}

	return (
		<div className="w-full flex justify-center items-center h-[900px] p-10"> {/*div prinsipale*/}
			<div className="hidden md:flex h-full w-2/5 xl:w-[30%] flex flex-col justify-between p-5 bg-black/80 rounded-l-md"> {/*div de gauche en rouge*/}
				<CreateChannel currentChannel={currentChannel} />
				<div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md ">
					<Channels takeChan={takeChan} currentChannel={currentChannel} setMessages={setMessages} data={data} userInChannel={userInChannel} />
				</div>
				<div className="w-full h-[40%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
					<DirectMessage takeChan={takeDMChan} currentChannel={currentChannel} />
				</div>
			</div>
			<div className="w-full h-full md:w-3/5 xl:[w-40%]">  {/*div du centre en bleu*/}
				<div className="h-[10%] rounded-md md:rounded-none md:rounded-r-md xl:rounded-none w-full bg-black/80 flex justify-center items-center">
					<h1 className="text-white text-3xl font-semibold">{currentChannel.split("_")[0]}</h1>
				</div>
				<div className="w-full h-[90%] shadow-md shadow-white border-2 border-white rounded-md">
					<div className="w-full h-5/6 bg-black/60 overflow-scroll p-5 shadow-md shadow-white">
						{messages.map((msg, index) => (
							<MessageChatCard msg={msg} index={index} />
						))}
					</div>
					<div className="w-full h-1/6  flex justify-center items-center bg-black/60 rounded-md">
						<form onSubmit={sendMessage} className=" flex w-2/3 h-full justify-center items-center">
							<label htmlFor="text" className="flex flex-col w-4/5">
								<textarea
									className="h-12 pl-2 resize-none rounded-md"
									name="data"
									onChange={(e) => setData(e.target.value)}
									placeholder="Type your message..."
									value={data}
									style={{ overflowX: 'auto', whiteSpace: 'pre-wrap' }}
								/>
								<button type="submit" disabled={pass === 'ko' ? true : false} className="shadow-md shadow-white  mt-4 rounded hover:bg-white"
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}>
									<h1 className="text-white hover:text-black">Send</h1>
								</button>
							</label>
						</form>
					</div>
				</div>
			</div>
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