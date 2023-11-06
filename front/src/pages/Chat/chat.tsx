import "./style.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import React from "react";
//import ReactDOM from "react-dom";





interface Message {
	message: string;
	username: string;
}
interface Chan {
	name: string;
	statue: string;
}

const Chat = () => {
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [all_channels, setChannels] = useState<Chan[]>([]);
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

	

	useEffect(() => {
		if (socket) {
			socket.on("message", (data, id) => {
				setMessages((prevMessages) => [
					...prevMessages,
					{ message: data, username: id }
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
			socket.on("getChannelMeOne", (lol, datta, owner, pass) => { //passStatue) => {
				console.log("la valeur du status du channel", datta)
				if (owner == 1) {
					setdis(false);
				}
				else {
					setdis(true);
				}
				if (datta == true) {
					setIsOn(false);
					socket.emit("message", data, lol, '1');
				}
				else {
					setIsOn(true);
					const password = prompt("what is the PassWord?");
					if(socket)
						socket.emit("checkPass", lol, password);
				}
				setPassword(pass);
			});
			socket.on("checkPass", (name, datta) => {
				setPass(datta);
				if (datta === "ok") {
					console.log("je passe par ici")
					socket.emit("message", data, name, '1');
					setMessages([]);
				}
			});
			socket.on("createchannel", (data, channel) => {
					console.log(data);
					//if (status == true) {
					//	setChannels((copie) => [...copie, { name: data, statue: "Public"}]);
					//}
					//else {
					//	setChannels((copie) => [...copie, { name: data, statue: "Private"}]);
					//}
					setChannels(data);
					setSetChannel(channel.name);
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
			socket.on("deleteChannel", (data) => {
				console.log(data)
				setChannels(data);
				if (data.length != 0){
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
				setSetChannel("create a channel!")
				setMessages([]);
			});
			socket.on("messages", (data, id) => {
				setMessages((prevMesssage) => [
					...prevMesssage, 
					{message: data, username: id}
				]); 	
			});
			socket.on("refreshChannelStatus", (data) => {
				setChannels(data);
				/*if (status == true) {
					setChannels((prevchan) => prevchan.map(chan => chan.name === name ? { ...chan, status: "Public"} : chan));
				}
				else {
					setChannels((prevchan) => prevchan.map(chan => chan.name === name ? { ...chan, status: "Private"} : chan));
				}*/
				//console.log(name);
				//console.log(status)
				//setChannels(data);
			});
		}
		return () => {
			if (socket) {
				socket.off("getAllChannels");
				socket.off("getChannelMeOne");
				socket.off("createchannel");
				socket.off("deleteChannel");
				socket.off("messages");
				socket.off("deleteChannelForAllUser");
				socket.off("setChannels(data);");
				socket.off("refreshChannelStatus");
				socket.off("checkPass");
			}
		};
	}, [socket]);

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel !== "create a channel!" && pass !== "ko") {
			if (socket) {
				socket.emit("message", data, set_channel, '0');
				setData("");
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
	};

	const deleteChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		if(!set_channel)
			prompt("select a cahnnel");
		//const namechannel = prompt("what is the name of channel");
		if (socket) {
			socket.emit("deleteChannel", set_channel);
		}
		alert('you delete a channel');
	};

	const addUserToChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		if(!set_channel)
			prompt("select a channel")
		const nameUser = prompt('the name of User for add of channel');
		if (socket) {
			socket.emit("addUserToChannel", set_channel, nameUser);
		}
	};
/*
	const getAllChannels = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("getAllChannels");
		}
	};*/

	const removeUserFromChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		//const nameChannel = prompt("what is the name of channel for remove a User");
		if(!set_channel)
			prompt("select a cahnnel")
		const nameUser = prompt('the name of User for remove of channel');
		if (socket) {
			socket.emit("removeUserFromChannel", set_channel, nameUser);
		}
	};

	const addAdmin = (e: SyntheticEvent) => {
		e.preventDefault();

		//const nameChannel = prompt("what is the name of channel for add a Admin User");
		if(!set_channel)
			prompt("select a cahnnel")
		const nameUser = prompt('the name of User for add admin');
		if (socket) {
			socket.emit("addAdmin", set_channel, nameUser);
		}
	};

	const removeAdmin = (e: SyntheticEvent) => {
		e.preventDefault();

		//const nameChannel = prompt("what is the name of channel for remove a Admin User");
		if(!set_channel)
			prompt("select a cahnnel")
		const nameUser = prompt('the name of User for remove admin');
		if (socket) {
			socket.emit("removeAdmin", set_channel, nameUser);
		}
	};

	function takeChan(lol: string) {
		setSetChannel(lol)
		console.log("valeur dans lol actuele", lol);
		console.log("set_channel actuell =", set_channel);
		if (socket){
			socket.emit("getChannelMeOne", lol, set_channel);
			setPass("ok")
			setMessages([]);
		}
	}
/*
	const changeStatue = (e: SyntheticEvent) => {
	//	if (i == "0")
	//		e.preventDefault();
	
		//console.log(SyntheticEvent.target.value)		
		if (set_channel != "create a channel!") {
			setStatue(!status);
		}
		else {
		//	setdis(!dis);
		}
		//setStatue(!status);
		console.log(set_channel)
		console.log(status)
		if (set_channel != "create a channel!") {

		}
		
	  };


	  <div className="container"> 
      				{"status"}
						<input type="checkbox" className="checkbox" 
              				name={"status"} 
							id={"status"}
							disabled={dis} //bloquer ou pas a cette avec les valeur du channel
							defaultChecked={dsi} //position de depart a set avec les valeur du channel sauf au debut
							onChange={changeStatue}
							value={set_channel}
							/>
				
       				<label className="label" htmlFor="status"> 
					   	<span className="inner"/>
        			</label>

				</div>
	  	*/

		const onClick = () => {
			setIsOn(!isOn)
		 }
		
		const handleSwitchChange = (on: any) => {
			console.log(`new switch "on" state:`, isOn)
			if (socket) {
			//	const password = prompt('choice a Password for the channel');
				socket.emit("changeStatue", set_channel, isOn);
			}
			if (isOn === false) {
				if (password === '0') {
					const pass = prompt("choice a Password for the Channel!");
					if (socket){
						socket.emit("setPassword", set_channel, pass);
					}
				}
				else if (password === '1') {

				}
			}
		}

	return (
		<div className="signup">
			<div className="hola">
				<button onClick={removeAdmin}>removeAdmin</button>
				<button onClick={addAdmin}>addAdmin</button>
				<button onClick={removeUserFromChannel}>removeUserFromChannel</button>
				<button onClick={addUserToChannel}>addUserToChannel</button>
				<button onClick={deleteChannel}>deleteChannel</button>
				<button onClick={createchannel}>createchannel</button>
			
				
			

			</div>
			<div className="channel">
				<div className="chann">
					<h1> channels </h1>			
						{all_channels.map((msg, index) => (
							<b className="b" key={index}>
								{msg.name} : {msg.statue} <input type="radio" name="channel" value={msg.name} onClick={() => takeChan(msg.name)} ></input>
								
									
								
							</b>
						))}
				</div>

				<div className="container"> 
      				{"status"}
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
				

				
			</div>
			<form onSubmit={sendMessage} id="chat">
				<h1> {set_channel} </h1>
				<div className="lol">
					{messages.map((msg, index) => (
						<b className="b" key={index}>
							{msg.username} : {msg.message}
						</b>
					))}
				</div>
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
	);

};
export default Chat;