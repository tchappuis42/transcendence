import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';

interface Props {
	currentChannel: string;
	channelStatus: boolean;
}

const ChannelStatus: React.FC<Props> = ({ currentChannel, channelStatus }) => {

	const [status, setStatus] = useState(false);
	const socket = useSocket();
	const [valid, setValid] = useState(false);

	const changeStatue = () => {
		if (socket) {
			socket.emit("changeStatue", currentChannel, status);
		}
	};

	useEffect(() => {
		setStatus(channelStatus)
	}, []);

	useEffect(() => {
		if (status !== channelStatus)
			setValid(true)
		else
			setValid(false)
	}, [status]);

	return (
		<div className='h-1/5 flex justify-between'>
			<h1 className='w-2/5 items-center flex'>changer le status du channel</h1>
			<button onClick={() => setStatus(!status)}>{status ? "public" : "priver"}</button>
			<div className='w-10 lg:w-14 flex item-center'>
				{valid &&
					<button onClick={changeStatue}>valider</button>
				}
			</div>
		</div>
	);
};

export default ChannelStatus;