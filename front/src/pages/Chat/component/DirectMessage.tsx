import { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { handleMouseEnter, handleMouseLeave } from '../../Friend/interface/Tools';
import { useAccount } from '../../../ui/organisms/useAccount';
import Channel from '../interface/channelDto';
import { SimpleRegistrationForm } from "./stylePopUP";
import { Account } from '../../../ui/types';

interface DMChannel {
	id: number;
	name: string;
	statue: string;
	user: Account[];
}

interface Props {
	takeChan(channelSet: string): void
	currentChannel: string;
}

const DirectMessage: React.FC<Props> = ({ takeChan, currentChannel }) => {
	const socket = useSocket();
	const [all_DMChannels, setDMCHannel] = useState<DMChannel[]>([]);
	const [chanName, setChanName] = useState("");
	const { account } = useAccount();

	useEffect(() => {
		if (socket) {
			socket.on("getDMChannelMe", (name, status, user, chanN) => {
				socket.emit("DMmessage", " ", name, '1');
				setChanName(chanN);
			});
			socket.on("createDMChannel", (data, channel, name) => {
				takeChan(channel);
				setDMCHannel(data);
			});
			socket.on("refreshDMChannel", (data) => {
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

	const getUserName = (users: Account[]) => {  //todo
		const userName = users.find(user => user.id !== account.id)
		return (userName?.username)
	}

	return (
		<div className="m-card">
			<div className='header-card'>
				<h1> DM </h1>
			</div>
			{!all_DMChannels ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "90%" }}>
					<h1 className='text-white opacity-60'>No Dm</h1>
				</div>
			) : (
				<div className="body-card">
					{all_DMChannels.map((msg, id) => (
						<div key={msg.id} className="card-channel"
							onMouseEnter={handleMouseEnter}
							onMouseLeave={handleMouseLeave}
						>
							<div className="h-full w-full flex flex-row justify-between px-5 items-center" onClick={() => takeChan(msg.name)}>
								<h1 className='name-card'>{getUserName(msg.user)}</h1>
								<h1 className='name-card'>{msg.statue}</h1>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default DirectMessage;