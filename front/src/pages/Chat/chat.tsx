import "./style.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import React from "react";
import { cleanup } from "@testing-library/react";



interface Message {
	message: string;
	username: string;
}
interface Chan {
	name: string;
}

const Chat = () => {
	const [data, setData] = useState("");
	const [messages, setMessages] = useState<Message[]>([]);
	const [all_channels, setChannels] = useState<Chan[]>([]);
//	let [count, setCount] = useState(0)
	const [set_channel, setSetChannel] = useState("");
	let [ref_channel, setRef_channel] = useState("");
	const socket = useSocket();
//	const channels = useState<Chan[]>([])
	

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
				setChannels(data);
			});
			socket.on("getChannelMeOne", (data) => {
				console.log(data)
			});
			socket.on("createchannel", (data, channel) => {
					console.log(data);
					setChannels(data);
					setSetChannel(channel.name);
					setMessages([]);
			});
			socket.on("deleteChannel", (data) => {
				setChannels(data);
				if (data.length != 0){
					setSetChannel(data[((data.length) - 1)].name);
				}
				else {
					setSetChannel("create a channel!")
					setMessages([]);
				}
			});
			socket.on("messages", (data, id) => {
				setMessages((prevMesssage) => [
					...prevMesssage, 
					{message: data, username: id}
				]); 	
			});
		}
		return () => {
			if (socket) {
				socket.off("getAllChannels");
				socket.off("getChannelMeOne");
				socket.off("createchannel");
				socket.off("deleteChannel");
				socket.off("messages");
			}
		};
	}, [socket]);

	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (set_channel != "create a channel!") {
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
			socket.emit("createchannel", namechannel);
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
		if (set_channel != "create a channel!") {
			setRef_channel(set_channel);
		}
		console.log("ref channel ancien channel = ", ref_channel);
		setSetChannel(lol)
		console.log("set_channel actuell =", set_channel);
		if (socket){
			socket.emit("getChannelMeOne", lol);
			socket.emit("message", data, lol, '1');
			setMessages([]);
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
								{msg.name} <button onClick={() => takeChan(msg.name)}>.</button>
							</b>
						))}
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
