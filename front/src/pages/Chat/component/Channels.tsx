import { SyntheticEvent, useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { handleMouseEnter, handleMouseLeave } from '../../Friend/interface/Tools';
import { createPortal } from "react-dom";
import AddAdmin from './AddAdmin';
import { Account } from '../../../ui/types';
import RemoveAdmin from './RemoveAdmin';
import MuteUser from './MuteUser';
import BanUser from './BanUser';
import DeleteChannel from './DeleteChannel';

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
	userInChannel: Account[];
}

const Channels: React.FC<Props> = ({ takeChan, currentChannel, setMessages, data, userInChannel }) => {
	const [all_channels, setChannels] = useState<Chan[]>([]);
	const [isOn, setIsOn] = useState(false)
	const [password, setPassword] = useState("");
	const socket = useSocket();
	const [Owner, setOwner] = useState("0");
	const [settings, setSettings] = useState(false);

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

	useEffect(() => {
		setOwner("0")
		if (socket) {
			socket.on("getChannelMeOne", (Id, lol, datta, owner, pass, user) => {
				console.log("owner = ", owner)
				setOwner(owner); //string pas number
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
				<div className='flex justify-center items-center h-[80%]'>
					<h1 className='text-white opacity-60'>No Channel</h1>
				</div>
			) : (
				<div className="h-4/5 overflow-y-auto overflow-x-hidden">
					{all_channels.map((msg, id) => (
						<div className="h-1/5 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer"
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
			{Owner !== "0" && <div className='h-[1/5] w-full flex justify-center'>
				<h1 onClick={() => setSettings(true)} className='text-white cursor-pointer'>setting</h1>
			</div>
			}
			{settings &&
				createPortal(
					<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50"> {/*possible de mettre ca dans un composant*/}
						<div className="w-[450px] lg:w-[900px] h-1/2 rounded-lg p-8 bg-gray-900 text-white">
							<div className="h-1/5 w-full flex flex-row-reverse justify-between">
								<button onClick={() => setSettings(false)} className="h-10">
									<h1 className="text-red-500 font-bold">X</h1>
								</button>
								<h1 className='text-xl flex font-semibold lg:text-4xl items-center'>Paramètres du channel : {currentChannel}</h1>
								{/*<h1 className='h-1/5'>status : {isOn ? "private" : "public"}</h1>*/}
							</div>
							{Owner === '1' && <div className='h-3/5 text-sm lg:text-xl'>
								<div className='h-1/5 flex justify-between'>
									<h1 className='w-2/5 items-end flex'>changer le status du channel</h1>
									<input type="text" placeholder='mot de passe' className='m-1' />
									<div className='w-14'></div>
								</div>
								<div className='h-1/5 flex justify-between'>
									<h1 className='w-2/5 items-end flex'>changer de mot de passe</h1>
									<input type="text" placeholder='ancien mot de passe' className='m-1' />
									<input type="text" placeholder='nouveau mot de passe' className='m-1' />
									<div className='w-14'></div>
								</div>
								<AddAdmin currentChannel={currentChannel} userInChannel={userInChannel} />
								<RemoveAdmin currentChannel={currentChannel} userInChannel={userInChannel} />
								<DeleteChannel currentChannel={currentChannel} setSettings={setSettings} />
							</div>}
							<div className='h-1/5 text-sm lg:text-xl'>
								<MuteUser currentChannel={currentChannel} userInChannel={userInChannel} />
								<BanUser currentChannel={currentChannel} userInChannel={userInChannel} />
							</div>
						</div>
					</div>,
					document.body
				)}
		</div>
	);
};

export default Channels;