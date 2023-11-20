import "./style.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import React from "react";
//import ReactDOM from "react-dom";

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
//	let [count, setCount] = useState(0)
	const [set_channel, setSetChannel] = useState("");
//	let [ref_channel, setRef_channel] = useState("");
	const socket = useSocket();
//	const channels = useState<Chan[]>([])
//	const [status, setStatue] = React.useState(false);
	const [dis, setdis] = React.useState(true);
//	const [dsi, setDsi] = React.useState(true);
	const [isOn, setIsOn] = React.useState(false)
	const [password, setPassword] = useState("");
	const [pass, setPass] = useState("");
	const [userId, setUserId] = useState(Number);
	const [DM_Chann, setDM_Chann] = useState("");
	const [Owner, setOwner] = useState("");

	

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
		}
		if (socket ) {
			socket.on("getAllChannels", (data) => {
				console.log(socket);
				setChannels(data)
			});
			socket.on("getChannelMeOne", (Id ,lol, datta, owner, pass) => { //passStatue) => {
				console.log("la valeur du status du channel", datta)
				console.log(owner)
				if (owner === '1') {
					setdis(false);
					setOwner(owner);
					console.log("je suis owner")
				}
				else {
					setdis(true);
					setOwner(owner);
					console.log("je suis pas owner")
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
				console.log(pass)
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
					//if (status == true) {
					//	setChannels((copie) => [...copie, { name: data, statue: "Public"}]);
					//}
					//else {
					//	setChannels((copie) => [...copie, { name: data, statue: "Private"}]);
					//}
					setChannels(data);
					setSetChannel(channel);
					setMessages([]);
			});
			socket.on("createDMChannel",  (data, channel) => {
				setDMCHannel(data);
				setSetChannel(channel);
				setMessages([]);
			});
			socket.on("refreshChannel", (data) => {
			/*	if (status == true) {
					setChannels((copie) => [...copie, { name: data, statue: "Public"}]);
				}
				else {
					setChannels((copie) => [...copie, { name: data, statue: "Private"}]);
				}*/
				setChannels(data);
			})
			socket.on("refreshDMChannel", (data) => {
				setDMCHannel(data);
			});
			socket.on("trans", (data) => {
				socket.emit("refreshDMChannel")
			});
			socket.on("deleteChannel", (data) => {
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
			});
			socket.on("deleteChannelForAllUser", (data) => {
				setChannels(data);
				setSetChannel("create a channel!");
				setMessages([]);
			});
			socket.on("messages", (data) => {
				setMessages(data)
				console.log(socket)	
			});
			socket.on("refreshChannelStatus", (data) => {
				setChannels(data);
				/*if (status == true) {
					setChannels((prevchan) => prevchan.map(chan => chan.name === name ? { ...chan, status: "Public"} : chan));
				}
				else {
					setChannels((prevchan) => prevchan.map(chan => chan.name === name ? { ...chan, status: "Private"} : chan));
				}*/
				
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
		}
		return () => {
			if (socket) {
				socket.off("getAllChannels");
				socket.off("getChannelMeOne");
				socket.off("createchannel");
				socket.off("deleteChannel");
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
			}
		};
	}, [socket, data, set_channel]);

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!" && pass !== "ko") {
			if (socket) {
				console.log(DM_Chann)
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
/*
	const channelMe = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("channelMe");
		}
	};*/

	const createchannel = (e: SyntheticEvent) => {
		e.preventDefault();

		const namechannel = prompt("what is the name of new channel");
		if (socket) {
			socket.emit("createchannel", namechannel, set_channel);
		}
	}

	const deleteChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		if(set_channel !== "create a channel!") {
			if (Owner === '1') {
				alert('you delete a channel');
		//const namechannel = prompt("what is the name of channel");
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
/*
	const addUserToChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		if(set_channel != "create a channel!") {
			if (userId != 0) {	
				if (socket) {
					socket.emit("addUserToChannel", set_channel, userId);
				}
			}
			else
				alert("you don't have seleted a User!")
		}
		else
			alert("you don't have choice a channel!")
	};*/
/*
	const getAllChannels = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("getAllChannels");
		}
	};*/

/*	const removeUserFromChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		//const nameChannel = prompt("what is the name of channel for remove a User");
		if(set_channel != "create a channel!") {
			if (userId != 0) {
				if (socket) {
					socket.emit("removeUserFromChannel", set_channel, userId);
				}
			}
			else
				alert("you don't have seleted a User!")
		}
		else
			alert("you don't have choice a channel!")
		console.log(userId)
	};*/

	const addAdmin = (e: SyntheticEvent) => {
		e.preventDefault();

		//const nameChannel = prompt("what is the name of channel for add a Admin User");
		
		if(set_channel !== "create a channel!") {
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

		if(set_channel !== "create a channel!") {
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

		if(set_channel !== "create a channel!") {
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

		if(set_channel !== "create a channel!") {
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

		if(set_channel !== "create a channel!") {
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

	const createDMChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		if (userId !== 0) {	
			if (socket) {
				socket.emit("createDMChannel", userId, set_channel);
			}
		}
		else
			alert("you don't have seleted a User!")
	}



	function takeChan(channelSet: string) {
		setSetChannel(channelSet)
		console.log("valeur dans lol actuele", channelSet);
		console.log("set_channel actuell =", set_channel);
		if (socket){
			socket.emit("getChannelMeOne", channelSet, set_channel);
			setPass("ok")
			setMessages([]);
		}
	}

	function takeDMChan(channelSet: string) {
		setSetChannel(channelSet)
		if (socket){
			socket.emit("getDMChannelMe", channelSet, set_channel);
			setPass("ok")
			setMessages([]);
		}
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
					if (socket){
						socket.emit("setPassword", set_channel, pass);
					}
				}	
			}
		}
	}

	return (
		<div className="globale">
			
			<div className="channel">
				<h1> channels </h1>	
				<div className="chann">
								
						{all_channels.map((msg, id) => (
							<b className="b" key={id}>
								{msg.name} : {msg.statue} <input className="channnel" type="button" name="channel" onClick={() => takeChan(msg.name)} ></input>
									
							</b>
						))}
				</div>

				<div className="DMchann">
								
						{all_DMChannels.map((msg, id) => (
							<b className="b" key={id}>
								{msg.name} : {msg.statue} <input className="DMchannnel" type="button" name="channel" onClick={() => takeDMChan(msg.name)}></input>
									
							</b>
						))}
				</div>

				<div className="container"> 
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
					   	<span className="inner"/>
        			</label>

				</div>

				<div className="hola">
					<button onClick={removeAdmin}>removeAdmin</button>
					<button onClick={addAdmin}>addAdmin</button>
					<button onClick={deleteChannel}>deleteChannel</button>
					<button onClick={changePass}>changePass</button>
					<button onClick={createchannel}>createchannel</button>
					<button onClick={MuetUser}>Muet</button>
					<button onClick={banUser}>ban</button>
			
				</div>
				
			</div>
			<div id="chat">
				<h1> {set_channel} </h1>
				<div className="lol">
					{messages.map((msg, index) => (
						<b className="b" key={index}>	
							<button className="select" onClick={() => takeUserName(msg.uId)} >{msg.username}</button>: {msg.message}	
						</b>
					))}
				</div>
				<form onSubmit={sendMessage}>
					<label htmlFor="text">
						<input
							type="text"
							name="data"
							onChange={(e) => setData(e.target.value)}
							placeholder="Type your messsage..." value={data}
						/>
						<button type="submit" className="button">
							send
						</button>
					</label>
				</form>
			</div>
			<div className="User">
				<h1> user </h1>
				<button onClick={createDMChannel}>createDM</button>
			</div>

		</div>
	);

};
export default Chat;