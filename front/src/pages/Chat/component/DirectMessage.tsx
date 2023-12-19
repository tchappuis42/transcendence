import { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { handleMouseEnter, handleMouseLeave } from '../../Friend/interface/Tools';
import { useAccount } from '../../../ui/organisms/useAccount';
import Channel from '../interface/channelDto';
import { PopUp } from "./stylePopUP";


interface Props {
	takeChan(channelSet: string): void
	currentChannel: string;
}

const DirectMessage: React.FC<Props> = ({ takeChan, currentChannel }) => {
	const socket = useSocket();
	const [all_DMChannels, setDMCHannel] = useState<Channel[]>([]);
	const { account } = useAccount();

	useEffect(() => {
		if (socket) {
			socket.on("getDMChannelMe", (name, status, user) => {
				socket.emit("DMmessage", " ", name, '1');
			});
			socket.on("createDMChannel", (data, channel) => {
				takeChan(channel);
				setDMCHannel(data);
			});
			socket.on("refreshDMChannel", (data) => {
				console.log("dataa :", data)
				setDMCHannel(data);
			});
		}
		return () => {
			if (socket) {
				socket.off("getDMChannelMe");
				socket.off("createDMChannel");
				socket.off("refreshDMChannel");
			}
		};
	}, [socket, currentChannel]);

	const getUserName = (name: string) => {  //todo
		const users = name.split("_");
		if (users[0] !== account.username)
			return users[0];
		if (users[1] !== account.username)
			return users[1];
		return ("")
	}

	return (
		<div className="bg-black/50 h-full w-full rounded-md">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1> DM </h1>
			</div>
			{!all_DMChannels ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
					<h1 className='text-white opacity-60'>No Dm</h1>
				</div>
			) : (
				<div className="h-[90%] overflow-y-auto overflow-x-hidden">
					{all_DMChannels.map((msg, id) => (
						<div className="h-1/6 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							{/* <div className="h-full w-full  flex flex-row justify-between px-5 items-center" onClick={() => takeChan(msg.name)}> */}
							<div className="h-full w-full  flex flex-row justify-between px-5 items-center" onClick={() => <PopUp currentChannel={currentChannel} />}>
								<h1 className='text-xl w-1/3'>{getUserName(msg.name)}</h1>
								<h1 className='text-xl  w-1/3'>{msg.statue}</h1>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DirectMessage;