import { SyntheticEvent, useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { useAccount } from '../../../ui/organisms/useAccount';
import { handleMouseEnter, handleMouseLeave } from '../../Friend/interface/Tools';

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
		<div className="bg-black/50 h-full w-full rounded-md" >
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1> channels </h1>
			</div>
			{!all_channels ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
					<h1 className='text-white opacity-60'>No Channel</h1>
				</div>
			) : (
				<div className="h-[90%] overflow-y-auto overflow-x-hidden">
					{all_channels.map((msg, id) => (
					<div className="h-1/6 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						>
						<div className="h-full w-full  flex flex-row justify-between px-5 items-center" onClick={() => takeChan(msg.name)}>
							<h1 className='text-xl w-1/3'>{msg.name}</h1>
							 <h1 className='text-xl w-1/3'>:</h1> 
							 <h1 className='text-xl  w-1/3'>{msg.statue}</h1>
						</div>
					</div>
				))}
				</div>
			)}
			{Owner === '1' && <div>
				<div className="w-full h-32 mt-2 rounded-md bg-black/60 pt-1 shadow-md shadow-white">
					<div className="  h-2/6  flex flex-row justify-center items-center">
						<h1 className='text-white text-xl w-1/3 flex items-center justify-end'>Status</h1>
						<div className='w-2/3 flex justify-center'>
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
				<div className='h-3/5 w-full  mt-2 flex flex-row items-stretch button-container'>
					<div className='h-1/2 w-full  flex flex-row justify-between button-container p-2'>

						<button className=" shadow-sm shadow-white rounded-md px-2 h-6 flex justify-center text-white text-xs bg-black/80 hover:text-black hover:bg-white" onClick={addAdmin} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>addAdmin</button>
						<button className=" shadow-sm shadow-white rounded-md px-2 h-6 flex justify-center text-white text-xs bg-black/80 hover:text-black hover:bg-white" onClick={MuetUser} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Muet</button>
						<button className=" shadow-sm shadow-white rounded-md px-2 h-6 flex justify-center text-white text-xs bg-black/80 hover:text-black hover:bg-white" onClick={removeAdmin} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>removeAdmin</button>
					</div>
					<div className='h-1/2 w-full flex flex-row justify-between button-container p-2'>
						<button className=" shadow-sm shadow-white rounded-md px-2 h-6 flex justify-center text-white text-xs bg-black/80 hover:text-black hover:bg-white" onClick={changePass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>changePass</button>
						<button className=" shadow-sm shadow-white rounded-md px-2 h-6 flex justify-center text-white text-xs bg-black/80 hover:text-black hover:bg-white" onClick={banUser} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>ban</button>
						<button className=" shadow-sm shadow-white rounded-md px-2 h-6 flex justify-center text-white text-xs bg-black/80 hover:text-black hover:bg-white" onClick={deleteChannel} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>deleteChannel</button>
					</div>
				</div>
				</div>
			</div>}
		</div>
	);
};

export default Channels;