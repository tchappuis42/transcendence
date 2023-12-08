import "./style.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import React from "react";
import ReactDOM from "react-dom";
import Friends from "../Friend/component/Friends";
import FriendsChat from "./component/FriendsChat";
import { Account } from "../../ui/types";
import { useLocation } from 'react-router-dom';
import UserInChannel from "./component/UserInChannel";
import Channels from "./component/Channels";
import DirectMessage from "./component/DirectMessage"

interface Message {
	message: string;
	username: string;
	uId: number
}

const Chat = () => {
	const location = useLocation();
	const [userInChannel, setUserInChannel] = useState<Account[]>([]);
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [set_channel, setSetChannel] = useState("");
	const [RepCss, setRepCss] = useState("");
	const [dis, setdis] = React.useState(true);
	const [pass, setPass] = useState("");
	const [userId, setUserId] = useState(Number);
	const [DM_Chann, setDM_Chann] = useState("");
	const socket = useSocket();

	useEffect(() => {
		//setChannels([])
		if (socket) {
			socket.emit("getAllChannels")
			socket.emit("refreshDMChannel")
		}
		//setChannels([])
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
		if (!set_channel) {
			setSetChannel("create a channel!")
		}
		if (socket) {
			socket.on("getChannelMeOne", (Id, lol, datta, owner) => {
				if (owner === '1')
					setdis(false);
				else
					setdis(true);
			});
			socket.on("getDMChannelMe", (name, status, user) => {
				setdis(false);
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
					setSetChannel(data[0].name)
					socket.emit("message", data, data[0].name, '1');
				//	setSetChannel(data[((data.length) - 1)].name);
				}
				else {
					setSetChannel("create a channel!")
					setMessages([]);
				}
			});*/
			socket.on("deleteChannelForAllUser", (data) => {
				setSetChannel("create a channel!");
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
	}, [socket, data, set_channel]);

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!" && pass !== "ko") {
			if (socket) {
				if (DM_Chann === "chan") {
					socket.emit("message", data, set_channel, '0');
					setData("");
				}
				else {
					socket.emit("DMmessage", data, set_channel, '0')
					setData("");
				}
			}
		}
	};

	const createchannel = (e: SyntheticEvent) => {
		e.preventDefault();

		const namechannel = prompt("what is the name of new channel");
		if (namechannel) {
			if (socket) {
				socket.emit("createchannel", namechannel, set_channel);
			}
		}
		else
			alert("wrong channel name")
	}

	function setteur(user: any) {
		setUserInChannel(user);
	}

	function takeChan(channelSet: string) {
		setSetChannel(channelSet)
		if (socket) {
			console.log("lalala = ", channelSet, set_channel)
			socket.emit("getChannelMeOne", channelSet, set_channel);
			setPass("ok")
			setMessages([]);
		}
		setRepCss("inner");
	}

	function takeDMChan(channelSet: string) {
		setSetChannel(channelSet)
		if (socket) {
			socket.emit("getDMChannelMe", channelSet, set_channel);
			setPass("ok")
			setMessages([]);
		}
		setRepCss("innerDM");
	}

	function takeUserName(user_Id: number) {
		setUserId(user_Id);
	}

	return (
		<div className="w-full flex justify-center items-center h-[850px] p-10"> {/*div prinsipale*/}
			<div className="hidden lg:block bg-red-500 h-full w-2/5 xl:w-[30%] flex justify-center items-center p-5"> {/*div de gauche en rouge*/}
				<div className="w-full h-1/2 bg-green-200">
					<Channels takeChan={takeChan} currentChannel={set_channel} setMessages={setMessages} data={data} disabled={dis} userId={userId} />
				</div>
				<div className="w-full h-1/2 bg-green-300">
					<DirectMessage takeChan={takeDMChan} currentChannel={set_channel} setMessages={setMessages} data={data} disabled={dis} userId={userId} />
				</div>
			</div>
			<div className="w-full bg-blue-500 h-full lg:w-3/5 xl:[w-40%]">  {/*div du centre en bleu*/}
				<div className="textChannelName"><h1>test {set_channel} </h1></div>
				<div className="boxForChat">
					{messages.map((msg, index) => (
						<b className="b" key={index}>
							<button className="select" onClick={() => takeUserName(msg.uId)} >{msg.username}</button>: {msg.message}
						</b>
					))}
				</div>
				<form onSubmit={sendMessage}>
					<label htmlFor="text">
						<input
							className="barText"
							type="text"
							name="data"
							onChange={(e) => setData(e.target.value)}
							placeholder="Type your messsage..." value={data}
						/>
						<button type="submit" className="sendButton">
							send
						</button>
					</label>
				</form>
			</div>
			<div className="hidden xl:block h-full bg-green-500 w-[30%]">  {/*div de droite en vert*/}
				<div className="textUser"></div>
				<div className="h-80 mt-12">
					<FriendsChat set_channel={set_channel} />
				</div>
				<div className="h-80 mt-12">
					<UserInChannel userInChannel={userInChannel} />
				</div>
				<button className="createChannelBtn" onClick={createchannel}>createchannel</button>
			</div>
		</div>
	);

};
export default Chat;