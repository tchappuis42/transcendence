import { SyntheticEvent, useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { useAccount } from '../../../ui/organisms/useAccount';

interface Chan {
	id: number;
	name: string;
	statue: string;
}

interface Message {
	message: string;
	username: string;
	uId: number
}

interface Props {
	takeChan: (channelSet: string) => void;
	currentChannel: string;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	data: string;
	disabled: boolean;
	userId: number;
}

const Channels: React.FC<Props> = ({ takeChan, currentChannel, setMessages, data, disabled, userId }) => {
	const [all_channels, setChannels] = useState<Chan[]>([]);
	const [isOn, setIsOn] = useState(false)
	const [password, setPassword] = useState("");
	const socket = useSocket();
	const [Owner, setOwner] = useState("");

	function setButton(data: any) {
		for (let i = 0; data[i]; ++i) {
			if (data[i].name === currentChannel) {
				if (data[i].statue === 'Public')
					setIsOn(false);
				else
					setIsOn(true);
			}
		}
	}

	const handleSwitchChange = (on: any) => {
		if (socket) {
			socket.emit("changeStatue", currentChannel, isOn);
		}
		if (isOn === false) {
			if (password === '0') {
				const pass = prompt("choice a Password for the Channel!");
				if (socket) {
					socket.emit("setPassword", currentChannel, pass);
				}
			}
		}
	}

	const deleteChannel = (e: SyntheticEvent) => {
		e.preventDefault();

		if (currentChannel !== "create a channel!") {
			if (Owner === '1') {
				alert('you delete a channel');
				if (socket) {
					socket.emit("deleteChannel", currentChannel);
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

		if (currentChannel !== "create a channel!") {
			if (userId !== 0) {
				if (socket) {
					socket.emit("addAdmin", currentChannel, userId);
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

		if (currentChannel !== "create a channel!") {
			if (Owner === '1') {
				if (password === '1') {
					if (socket) {
						const oldPass = prompt("the old passWorl!");
						const newPass = prompt("the new PassWorld!");
						socket.emit("changePass", currentChannel, oldPass, newPass);
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

	const MuetUser = (e: SyntheticEvent) => {
		e.preventDefault();

		if (currentChannel !== "create a channel!") {
			if (userId !== 0) {
				if (socket) {
					socket.emit("muetUser", currentChannel, userId);
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

		if (currentChannel !== "create a channel!") {
			if (userId !== 0) {
				if (socket) {
					socket.emit("banUser", currentChannel, userId);
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

		if (currentChannel !== "create a channel!") {
			if (userId !== 0) {
				if (socket) {
					socket.emit("removeAdmin", currentChannel, userId);
				}
			}
			else
				alert("you don't have seleted a User!")
		}
		else
			alert("you don't have choice a channel!")
	};

	useEffect(() => {
		setOwner("")
		if (socket) {
			socket.on("getChannelMeOne", (Id, lol, datta, owner, pass, user) => {
				setOwner(owner);
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
				//setteur(user);
				//setUserInChannel(user);
				console.log(owner)
			});
			socket.on("getAllChannels", (data) => {
				setChannels(data)
			});
			socket.on("refreshChannel", (data) => {
				setChannels(data);
			})
			socket.on("refreshChannelStatus", (data) => {
				setChannels(data);
				setButton(data);

			});
			socket.on("createchannel", (data, channel) => {
				takeChan(channel);
				setChannels(data);
				setMessages([]);
			});
			socket.on("deleteChannelForAllUser", (data) => {
				setChannels(data);
				setMessages([]);
			});
		}
		return () => {
			if (socket) {
				socket.off("getAllChannels");
				socket.off("refreshChannel");
				socket.off("refreshChannelStatus");
				socket.off("getChannelMeOne");
				socket.off("createchannel");
			}
		};
	}, [socket, currentChannel]);

	const onClick = () => {
		setIsOn(!isOn)
	}

	return (
		<div h-full>
			<div className="textChannel"> <h1> channels </h1></div>
			<div className="boxChann">
				{all_channels.map((msg, id) => (
					<b className="text_textButonChannel" key={id}>
						<div className="text_butonChannel" onClick={() => takeChan(msg.name)}>
							{msg.name} : {msg.statue}
						</div>
					</b>
				))}
			</div>
			{Owner === '1' && <div>
				<div className="w-full h-1/5 bg-green-500">
					<div className="containerStatus">
						<li>{"status"}</li>
						<input type="checkbox" className="checkbox"
							name={"status"}
							id={"status"}
							onClick={onClick}
							onChange={handleSwitchChange}
							checked={isOn}
							disabled={disabled}
							aria-labelledby="switchLabel"
						/>
						<label className="label" htmlFor="status">
							<span className="inner" />
						</label>
					</div>
				</div>
				<div>
					<button className="butonAdministrationChat" onClick={removeAdmin}>removeAdmin</button>
					<button className="butonAdministrationChat" onClick={addAdmin}>addAdmin</button>
					<button className="butonAdministrationChat" onClick={deleteChannel}>deleteChannel</button>
					<button className="butonAdministrationChat" onClick={changePass}>changePass</button>
					<button className="butonAdministrationChat" onClick={MuetUser}>Muet</button>
					<button className="butonAdministrationChat" onClick={banUser}>ban</button>
				</div>
			</div>}
		</div>
	);
};

export default Channels;