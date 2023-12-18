import { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { handleMouseEnter, handleMouseLeave } from '../../Friend/interface/Tools';
import { createPortal } from "react-dom";
import AddAdmin from './AddAdmin';
import { Account } from '../../../ui/types';
import RemoveAdmin from './RemoveAdmin';
import MuteUser from './MuteUser';
import BanUser from './BanUser';
import DeleteChannel from './DeleteChannel';
import ChangePassword from './ChangePassword';
import ChannelStatus from './ChannelStatus';
import Message from '../interface/messageDto';
import Channel from '../interface/channelDto';

interface Props {
	takeChan: (channelSet: string, chanStatus: string) => void;
	currentChannel: string;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	userInChannel: Account[];
}

const Channels: React.FC<Props> = ({ takeChan, currentChannel, setMessages, userInChannel }) => {
	const [all_channels, setChannels] = useState<Channel[]>([]);
	const [channelStatus, setChannelStatus] = useState(false);
	const socket = useSocket();
	const [Owner, setOwner] = useState("0");
	const [settings, setSettings] = useState(false);
	const [successPassword, setSuccessPass] = useState("");

	useEffect(() => {
		setOwner("0")
		if (socket) {
			socket.on("getChannelMeOne", (Id, chanName, status, owner) => {
				setOwner(owner);
				setChannelStatus(status)
				if (status) {
					socket.emit("message", " ", chanName, '1');
				}
				else { //todo
					const password = prompt("what is the PassWord?");
					if (socket)
						socket.emit("checkPass", chanName, password);
				}
			});
			socket.on("getAllChannels", (data) => {
				setChannels(data)
			});
			socket.on("refreshChannel", (data) => {
				setChannels(data);
			})
			socket.on("refreshChannelStatus", (data: Channel[]) => {
				setChannels(data);
				const status = data.find((chan) => { if (chan.name === currentChannel) { return chan.statue } })
				if (status?.statue === 'Private')
					setChannelStatus(false);
				else
					setChannelStatus(true);

			});
			socket.on("createchannel", (data, channel) => {
				takeChan(channel, "public");
				setChannels(data);
				setMessages([]);
			});
			socket.on("deleteChannelForAllUser", (data) => {
				setChannels(data);
				setMessages([]);
				setSettings(false);
			});
			socket.on("changePass", (passInfo) => {
				setTimeout(() => {
					setSuccessPass("")
				}, 5000);
				if (passInfo === "1")
					setSuccessPass("mot de passe mis à jour")
				else
					setSuccessPass("erreur dans le changement du mot de passe")
			});
		}
		return () => {
			if (socket) {
				socket.off("changePass");
				socket.off("getAllChannels");
				socket.off("refreshChannel");
				socket.off("refreshChannelStatus");
				socket.off("getChannelMeOne");
				socket.off("createchannel");
				socket.off("deleteChannelForAllUser");
			}
		};
	}, [socket, currentChannel]);

	const colorStyle = () => {
		if (successPassword === "mot de passe mis à jour")
			return { color: "green" }
		return { color: "red" }
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
							<div className="h-full w-full  flex flex-row justify-between px-5 items-center" onClick={() => takeChan(msg.name, msg.statue)}>
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
					<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-40"> {/*possible de mettre ca dans un composant*/}
						<div className="w-[450px] lg:w-[900px] h-[460px] rounded-lg p-6 bg-gray-900 text-white">
							<h1 style={colorStyle()} className='h-[5%] flex items-center justify-center'>{successPassword}</h1>
							<div className="h-[15%] w-full flex flex-row-reverse justify-between">
								<button onClick={() => setSettings(false)} className="h-10">
									<h1 className="text-red-500 font-bold">X</h1>
								</button>
								<h1 className='text-xl flex font-semibold lg:text-4xl items-center'>Paramètres du channel : {currentChannel}</h1>
							</div>
							{Owner === '1' && <div className='h-3/5 text-sm lg:text-xl'>
								<ChannelStatus currentChannel={currentChannel} channelStatus={channelStatus} />
								<ChangePassword currentChannel={currentChannel} />
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