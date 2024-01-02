import React, { useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';

interface Props {
	currentChannel: string;
	setSettings: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteChannel: React.FC<Props> = ({ currentChannel, setSettings }) => {

	const [deleteChan, setDeleteChan] = useState(false);
	const socket = useSocket();

	const deleteChannel = () => {
		if (socket) {
			socket.emit("deleteChannel", currentChannel);
		}
		setSettings(false)
	};

	return (
		<div className='flex justify-between h-1/5'>
			<h1 className='w-2/5 items-center flex'>suprimer le channel</h1>
			<button onClick={() => setDeleteChan(!deleteChan)}>{deleteChan ? "annuler" : "supprimer"}</button>
			<div className='w-10 lg:w-14 flex items-center'>
				{deleteChan &&
					<button onClick={deleteChannel}>valider</button>
				}
			</div>
		</div>
	);
};

export default DeleteChannel;