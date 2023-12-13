import React, { useEffect, useState } from 'react';
import { Account } from '../../../ui/types';
import { useAccount } from '../../../ui/organisms/useAccount';
import { useSocket } from '../../../ui/organisms/SocketContext';

interface Props {
	currentChannel: string;
	userInChannel: Account[];
}

const BanUser: React.FC<Props> = ({ userInChannel, currentChannel }) => {

	const { account } = useAccount()
	const [selectedUser, setSelectedUser] = useState<Account>();
	const [users, setUsers] = useState<Account[]>([]);
	const [time, setTime] = useState('5');
	const socket = useSocket();

	useEffect(() => {
		setUsers(userInChannel.filter(user => user.id !== account.id))
	}, []);

	const banUser = () => {
		if (socket) {
			socket.emit("banUser", currentChannel, selectedUser?.id, time); //time
		}

	};

	const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedUserName = e.target.value;
		const selectedUser = users.find(user => user.username === selectedUserName)
		setSelectedUser(selectedUser);
	}

	return (
		<div className='flex justify-between h-1/2'>
			<h1 className='w-2/5 items-center flex'>bannir temporairement un utilisateur</h1>
			<select value={selectedUser?.username} onChange={handleUserChange} className='w-20 lg:w-[295px] text-black m-1'>
				<option value=''>-- Sélectionner un utilisateur --</option>
				{users.map((user, index) => (
					<option value={user.username} key={index}>
						{user.username}
					</option>
				))}
			</select>
			<select value={time} onChange={e => setTime(e.target.value)} className='w-16 lg:w-32 text-black m-1'>
				<option value='5' key={1}>5 minutes</option>
				<option value="10" key={2}>10 minutes</option>
				<option value="15" key={3}>15 minutes</option>
				<option value="30" key={4}>30 minutes</option>
				<option value="0" key={5}>expulser</option>
			</select>
			<div className='w-10 lg:w-14 flex items-center'>
				{selectedUser &&
					<button onClick={banUser}>valider</button>
				}
			</div>
		</div>
	);
};

export default BanUser;