import { SetStateAction, useEffect, useState } from 'react';
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
import { SimpleRegistrationForm } from './stylePopUP';


interface Props {
	takeChan: (channelSet: string, chanStatue: string, password?: string) => void;
	currentChannel: string;
	setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
	userInChannel: Account[];
	channelStatus: boolean;
	Owner: string;
	setChannelStatus: React.Dispatch<SetStateAction<boolean>>;
	setOwner: React.Dispatch<SetStateAction<string>>;
}

const Channels: React.FC<Props> = ({ takeChan, currentChannel, setMessages, userInChannel, channelStatus, Owner, setChannelStatus, setOwner }) => {
	const [all_channels, setChannels] = useState<Channel[]>([]);
	//	const [channelStatus, setChannelStatus] = useState(false);
	const socket = useSocket();
	//	const [Owner, setOwner] = useState("0");
	const [settings, setSettings] = useState(false);
	const [successPassword, setSuccessPass] = useState("");
	const [selectedMessage, setSelectedMessage] = useState<Channel | undefined>(undefined);

	useEffect(() => {
		setOwner("0")
		if (socket) {
			socket.on("getChannelMeOne", (Id, chanName, status, owner) => {
				setOwner(owner);
				socket.emit("message", " ", chanName, '1');
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
				takeChan(channel, "Public");
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

	const closeForm = () => {
		setSelectedMessage(undefined);
	};

	return (
		<div className="m-card" >
			{selectedMessage && selectedMessage.statue !== "Public" &&
				createPortal(
					<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
						<SimpleRegistrationForm name={selectedMessage.name} closeForm={closeForm} callback={(pwd: string,) => { takeChan(selectedMessage.name, selectedMessage.statue, pwd); }} />
					</div>,
					document.body
				)
			}
			<div className='header-card'>
				<h1> channels </h1>
			</div>
			<div className='body-card'>
				{!all_channels ? (
					<div className='body-card'>
						<h1 className='text-black/60 opacity-60'>No Channel</h1>
					</div>
				) : (
					<div className="body-card">
						<div className='h-[95%]'>
							{all_channels.map((msg, id) => (
								<div key={msg.id} className="card-channel"
									onMouseEnter={handleMouseEnter}
									onMouseLeave={handleMouseLeave}
								>
									<div className="grid grid-cols-6 w-full h-full" onClick={() => { msg.statue !== "Public" ? setSelectedMessage(msg) : takeChan(msg.name, msg.statue) }}>
										<h1 className='name-card'>{msg.name}</h1>
										<h1 className='name-card'>:</h1>
										<h1 className='name-card'>{msg.statue}</h1>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
				{Owner !== "0" && <div className='h-[1/5] w-full flex justify-center'>
					<h1 onClick={() => setSettings(true)} className='flex justify-center bouton1-card w-full border-black/60'>setting</h1>
				</div>
				}
				{settings &&
					createPortal(
						<div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-40"> {/*possible de mettre ca dans un composant*/}
							<div className="w-[450px] lg:w-[900px] h-[460px] rounded-lg p-6 bg-gray-900 text-white">
								<h1 style={colorStyle()} className='flex items-center justify-center'>{successPassword}</h1>
								<div className="h-[10%] w-full flex flex-row-reverse justify-between">
									<button onClick={() => setSettings(false)} className="h-10">
										<h1 className="text-red-500 font-bold">X</h1>
									</button>
									<h1 className='text-xl flex font-semibold lg:text-4xl items-center'>Paramètres du channel : {currentChannel}</h1>
								</div>
								{Owner === '1' && <div className='h-3/5 text-sm lg:text-xl p-4'>
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
		</div>
	);
};

export default Channels;