import "./style.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import React from "react";
import ReactDOM from "react-dom";
import Friends from "../Friend/component/Friends";
import FriendsChat from "./component/FriendsChat";

interface Message {
	message: string;
	username: string;
	uId: number
}
interface Chan {
	id: number;
	name: string;
	statue: string;
}
interface DMChan {
	id: number;
	name: string
	statue: string;
}

const Chat = () => {
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [all_channels, setChannels] = useState<Chan[]>([]);
	const [all_DMChannels, setDMCHannel] = useState<DMChan[]>([]);
	const [set_channel, setSetChannel] = useState("");
	const [RepCss, setRepCss] = useState("");
	const [dis, setdis] = React.useState(true);
	const [isOn, setIsOn] = React.useState(false)
	const [password, setPassword] = useState("");
	const [pass, setPass] = useState("");
	const [userId, setUserId] = useState(Number);
	const [DM_Chann, setDM_Chann] = useState("");
	const [Owner, setOwner] = useState("");
	const [iniitButton, init_Button] = useState("")
	const socket = useSocket();



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
		setChannels([])
		if (socket) {
			socket.emit("getAllChannels")
			socket.emit("refreshDMChannel")
		}
		setChannels([])
	}, [socket]);

	useEffect(() => {
		if (!set_channel) {
			setSetChannel("create a channel!")
			init_Button("bye")
		}
		if (socket) {
			socket.on("getAllChannels", (data) => {
				setChannels(data)
			});
			socket.on("getChannelMeOne", (Id, lol, datta, owner, pass) => {
				if (owner === '1') {
					setinfo(false);
					setOwner(owner);
				}
				else {
					setinfo(true);
					setOwner(owner);
				}
				if (datta === true) {
					setIsOn(false);
					socket.emit("message", data, lol, '1');
				}
				else {
					setIsOn(true);
					const password = prompt("what is the PassWord?");
					if (socket)
						socket.emit("checkPass", lol, password);
				}
				setPassword(pass);
				setDM_Chann("chan");
			});
			socket.on("getDMChannelMe", (name, status) => {
				setdis(false);
				setPassword('0');
				setIsOn(status);
				socket.emit("DMmessage", data, name, '1');
				setDM_Chann("DM")
			});
			socket.on("checkPass", (name, datta) => {
				setPass(datta);
				if (datta === "ok") {
					socket.emit("message", data, name, '1');
					setMessages([]);
				}
			});
			socket.on("createchannel", (data, channel) => {
				takeChan(channel);
				setChannels(data);
				setMessages([]);
			});
			socket.on("createDMChannel", (data, channel) => {
				takeDMChan(channel);
				setDMCHannel(data);

				setMessages([]);
			});
			socket.on("refreshChannel", (data) => {
				setChannels(data);
			})
			socket.on("refreshDMChannel", (data) => {
				setDMCHannel(data);
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
				setChannels(data);
				setSetChannel("create a channel!");
				setMessages([]);
				init_Button("bye")
				setRepCss("")
			});
			socket.on("messages", (data) => {
				setMessages(data)
				console.log(socket)
			});
			socket.on("refreshChannelStatus", (data) => {
				setChannels(data);
				setButton(data);

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
				socket.off("getAllChannels");
				socket.off("getChannelMeOne");
				socket.off("createchannel");
				//	socket.off("deleteChannel");
				socket.off("messages");
				socket.off("deleteChannelForAllUser");
				socket.off("refreshChannel");
				socket.off("refreshChannelStatus");
				socket.off("checkPass");
				socket.off("banUser");
				socket.off("createDMChannel");
				socket.off("refreshDMChannel");
				socket.off("trans");
				socket.off("getDMChannelMe");
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

	const deleteChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!") {
			if (Owner === '1') {
				alert('you delete a channel');
				if (socket) {
					socket.emit("deleteChannel", set_channel);
				}
				alert('you have delete a channel');
			}
			else
				alert("you are not the Owner");
		}
		else
			alert("you don't have choice a channel!")
	};

	const addAdmin = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!") {
			if (userId !== 0) {
				if (socket) {
					socket.emit("addAdmin", set_channel, userId);
				}
			}
			else
				alert("you don't have seleted a User!")
		}
		else
			alert("you don't have choice a channel!")
	};

	const removeAdmin = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!") {
			if (userId !== 0) {
				if (socket) {
					socket.emit("removeAdmin", set_channel, userId);
				}
			}
			else
				alert("you don't have seleted a User!")
		}
		else
			alert("you don't have choice a channel!")
	};

	const MuetUser = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!") {
			if (userId !== 0) {
				if (socket) {
					socket.emit("muetUser", set_channel, userId);
				}
			}
			else
				alert("you don't have seleted a User!")
		}
		else
			alert("you don't have choice a channel!")
	};

	const banUser = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!") {
			if (userId !== 0) {
				if (socket) {
					socket.emit("banUser", set_channel, userId);
				}
			}
			else
				alert("you don't have seleted a User!")
		}
		else
			alert("you don't have choice a channel!")
	};

	const changePass = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!") {
			if (Owner === '1') {
				if (password === '1') {
					if (socket) {
						const oldPass = prompt("the old passWorl!");
						const newPass = prompt("the new PassWorld!");
						socket.emit("changePass", set_channel, oldPass, newPass);
					}
				}
				else
					alert("it is impossible to change an unknown password!")
			}
			else
				alert("you are not the Owner");
		}
		else
			alert("you don't have choice a channel!")
	};

	function setButton(data: any) {
		for (let i = 0; data[i]; ++i) {
			if (data[i].name === set_channel) {
				if (data[i].statue === 'Public')
					setIsOn(false);
				else
					setIsOn(true);
			}
		}
	}

	function setinfo(info: boolean) {
		setdis(info);
	}

	function takeChan(channelSet: string) {
		setSetChannel(channelSet)
		if (socket) {
			socket.emit("getChannelMeOne", channelSet, set_channel);
			setPass("ok")
			setMessages([]);
		}
		setRepCss("inner");
		init_Button("hola")
	}

	function takeDMChan(channelSet: string) {
		setSetChannel(channelSet)
		if (socket) {
			socket.emit("getDMChannelMe", channelSet, set_channel);
			setPass("ok")
			setMessages([]);
		}
		setRepCss("innerDM");
		init_Button("bye")
	}

	function takeUserName(user_Id: number) {
		setUserId(user_Id);
	}

	const onClick = () => {
		setIsOn(!isOn)
	}

	const handleSwitchChange = (on: any) => {
		console.log(`new switch "on" state:`, isOn)
		if (DM_Chann === "DM") {
			if (socket)
				if (isOn === false)
					socket.emit("DMBlock", set_channel, true);
				else
					socket.emit("DMBlock", set_channel, false);
		}
		else {
			if (socket) {
				socket.emit("changeStatue", set_channel, isOn);
			}
			if (isOn === false) {
				if (password === '0') {
					const pass = prompt("choice a Password for the Channel!");
					if (socket) {
						socket.emit("setPassword", set_channel, pass);
					}
				}
			}
		}
	}

	return (
		<div className="globale">
			<div className="channel">
				<div className="textChannel"> <h1> channels </h1></div>
				<div className="chann">
					{all_channels.map((msg, id) => (
						<b className="b" key={id}>
							{msg.name} : {msg.statue} <input className="channnel" type="button" name="channel" onClick={() => takeChan(msg.name)}></input>
						</b>
					))}
				</div>
				<div className="textDM"> <h1> DM </h1></div>
				<div className="DMchann">
					{all_DMChannels.map((msg, id) => (
						<b className="b" key={id}>
							{msg.name} : {msg.statue} <input className="DMchannnel" type="button" name="channel" onClick={() => takeDMChan(msg.name)}></input>
						</b>
					))}
				</div>
				<div className="containerStatus">
					<li>{"status"}</li>
					<input type="checkbox" className="checkbox"
						name={"status"}
						id={"status"}
						onClick={onClick}
						onChange={handleSwitchChange}
						checked={isOn}
						disabled={dis}
						aria-labelledby="switchLabel"
					/>
					<label className="label" htmlFor="status">
						<span className={RepCss} />
					</label>
				</div>
				<div className={iniitButton}>
					<button className="hola1" onClick={removeAdmin}>removeAdmin</button>
					<button className="hola1" onClick={addAdmin}>addAdmin</button>
					<button className="hola1" onClick={deleteChannel}>deleteChannel</button>
					<button className="hola1" onClick={changePass}>changePass</button>
					<button className="hola1" onClick={MuetUser}>Muet</button>
					<button className="hola1" onClick={banUser}>ban</button>
				</div>
			</div>
			<div id="chat">
				<div className="textChannelName"><h1> {set_channel} </h1></div>
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
			<div className="User">
				<div className="textUser"></div>
				<div className="h-80 mt-12">
					<FriendsChat set_channel={set_channel} />
				</div>
				<button className="createChannelBtn" onClick={createchannel}>createchannel</button>
			</div>
		</div>
	);

};
export default Chat;