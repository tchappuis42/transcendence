import "./style.css";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSocket } from "../../ui/organisms/SocketContext";
import React from "react";
import { cleanup } from "@testing-library/react";



interface Message {
	text: string;
	id: string;
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
	const socket = useSocket();
	const channels = useState<Chan[]>([])
	

	useEffect(() => {
		if (socket) {
			socket.on("message", (data, id) => {
				setMessages((prevMessages) => [
					...prevMessages,
					{ text: data, id: id }
				]);
			});

			socket.on("test", (data) => {
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
// faire une requette a l'api sans socket lors de la connection et renvoyer les infos avec getAllChannels 
// lors d'une creation de channel renvoyer l'infos a tous le monde, retirer le bouton getAllChannels, utiliser la fonction getChannel pour dire dans quel channel on est
// et ansi transmettre les infos a l'api, 
		//if (count != 0) {
		//	for (let i = 0; all_channels[i]; i++) {
			//	console.log(all_channels[i].name)
			//	console.log("le all_channels")
		//	}
		//	console.log("le all_channels")
		//}
		setChannels([])
		if (socket ) {
		//	socket.emit("getAllChannels")
			socket.on("getAllChannels", (data) => {
				console.log(data[0].name)
			//	console.log(data.length)
				for (let i = 0; i<data.length; i++) {
					setChannels((all_channell) => [
						...all_channell,
						{ name: data[i].name}
					])};
			});
		//	count++;
		}
	
	//	console.log(count)
	//	console.log("le count")
		return () => {
			if (socket) {
				socket.off("getAllChannels");
			}
		};
	}, [socket]);
/*
	useEffect(() => {
		if (!set_channel) {
			setSetChannel(all_channels[0].name)
		}
	}, [])
*/
	const sendMessage = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("message", data);
			setData("");
		}
	};

	const channelMe = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("channelMe");
		}
	};

	const createchannel = (e: SyntheticEvent) => {
		e.preventDefault();

		const namechannel = prompt("what is the name of channel");
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
			prompt("select a cahnnel")
		const nameUser = prompt('the name of User for add of channel');
		if (socket) {
			socket.emit("addUserToChannel", set_channel, nameUser);
		}
	};

	const getAllChannels = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("getAllChannels");
		}
	};

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
	//	console.log(lol)
		setSetChannel(lol)
		if (socket){
			socket.emit("getChannelMeOne", lol)
			socket.on("getChannelMeOne", (data) => {
				console.log(data)
			//	console.log(socket)
				console.log("yop")
				});
		}
		return () => {
			if (socket) {
				socket.off("getChannelMeOne");
			}
		};
	  }

	return (
		<div className="signup">
			<div className="hola">
				<button onClick={removeAdmin}>removeAdmin</button>
				<button onClick={addAdmin}>addAdmin</button>
				<button onClick={removeUserFromChannel}>removeUserFromChannel</button>
				<button onClick={getAllChannels}>getAllChannels</button>
				<button onClick={addUserToChannel}>addUserToChannel</button>
				<button onClick={deleteChannel}>deleteChannel</button>
				<button onClick={createchannel}>createchannel</button>
				<button onClick={channelMe}>channelMe</button>
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
							{msg.id} : {msg.text}
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
