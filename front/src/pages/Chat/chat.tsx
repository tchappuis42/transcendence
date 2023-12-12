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

interface Message {
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
	const location = useLocation();
	const [userInChannel, setUserInChannel] = useState<Account[]>([]);
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [currentChannel, setCurrentChannel] = useState("");
	const [pass, setPass] = useState(""); // a sup
	const [userId, setUserId] = useState(Number); // a sup
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
			socket.on("checkPass", (name, datta) => {
				setPass(datta);
				if (datta === "ok") {
					socket.emit("message", data, name, '1');
					setMessages([]);
				}
			});
			socket.on("trans", (data) => {
				socket.emit("refreshDMChannel")
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
			socket.on("changePass", (passInfo) => {
				if (passInfo === "1")
					alert("PassWord change successfully!")
				else
					alert("failure to change PassWord!")
			})
			socket.on("emptyPassWord", (data) => {
				alert("empty PassWord");
				const pass = prompt("choice a Password for the Channel!");
				if (socket) {
					socket.emit("setPassword", data, pass);
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
				socket.off("changePass");
				socket.off("emptyPassWord");
			}
		};
	}, [socket, data, currentChannel]);

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();
		console.log("DM_chann : ", DM_Chann)

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

	const createchannel = (e: SyntheticEvent) => {
		e.preventDefault();

		const namechannel = prompt("what is the name of new channel");
		if (namechannel) {
			if (socket) {
				socket.emit("createchannel", namechannel, currentChannel);
			}
		}
		else
			alert("wrong channel name")
	}

	function setteur(user: any) {
		setUserInChannel(user);
	}

	function takeChan(channelSet: string) {
		setCurrentChannel(channelSet)
		if (socket) {
			console.log("lalala = ", channelSet, currentChannel)
			socket.emit("getChannelMeOne", channelSet, currentChannel);
			setPass("ok")
			setMessages([]);
		}
	}

	function takeDMChan(channelSet: string) {
		setCurrentChannel(channelSet)
		if (socket) {
			socket.emit("getDMChannelMe", channelSet, currentChannel);
			setPass("ok")
			setMessages([]);
		}
	}

	function takeUserName(user_Id: number) {
		setUserId(user_Id);
	}

	return (
		<div className="w-full flex justify-center items-center h-[900px] p-10"> {/*div prinsipale*/}
			<div className="hidden md:flex h-full w-2/5 xl:w-[30%] flex flex-col justify-between p-5 bg-black/80 rounded-l-md"> {/*div de gauche en rouge*/}
				<div className="flex justify-center items-center h-[10%]">
					<button onClick={createchannel} className="w-2/3 h-2/3 shadow-md shadow-white bg-black/60 rounded hover:bg-white"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}>
						<h1 className="text-white hover:text-black text-2xl text-xl lg:text-3xl">Create Channel</h1>
					</button>
				</div>
				<div className="w-full h-[45%] bg-black/60 shadow-md flex-start shadow-white rounded-md ">
					<Channels takeChan={takeChan} currentChannel={currentChannel} setMessages={setMessages} data={data} userInChannel={userInChannel} />
				</div>
				<div className="w-full h-[40%] bg-black/60 shadow-md flex-start shadow-white rounded-md">
					<DirectMessage takeChan={takeDMChan} currentChannel={currentChannel} setMessages={setMessages} data={data} userId={userId} />
				</div>
			</div>
			<div className="w-full h-full md:w-3/5 xl:[w-40%]">  {/*div du centre en bleu*/}
				<div className="h-[10%] rounded-md md:rounded-none md:rounded-r-md xl:rounded-none w-full bg-black/80 flex justify-center items-center">
					<h1 className="text-white text-3xl font-semibold">{currentChannel.split("_")[0]}</h1>
				</div>
				<div className="w-full h-[90%] shadow-md shadow-white border-2 border-white rounded-md">
					<div className="w-full h-5/6 bg-black/60 overflow-scroll p-5 shadow-md shadow-white">
						{messages.map((msg, index) => (
							<MessageChatCard msg={msg} index={index} takeUserName={takeUserName} />
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
								<button type="submit" className="shadow-md shadow-white  mt-4 rounded hover:bg-white"
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