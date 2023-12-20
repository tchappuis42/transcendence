import React, { useEffect, useState } from 'react';
import { Account } from '../../../ui/types';
import { useAccount } from '../../../ui/organisms/useAccount';
import { useSocket } from '../../../ui/organisms/SocketContext';

interface Props {
	currentChannel: string;
	userInChannel: Account[];
}

const RemoveAdmin: React.FC<Props> = ({ userInChannel, currentChannel }) => {

	const { account } = useAccount()
	const [selectedUser, setSelectedUser] = useState<Account>();
	const [users, setUsers] = useState<Account[]>([]);
	const socket = useSocket();

	useEffect(() => {
		setUsers(userInChannel.filter(user => user.id !== account.id))
	}, []);

	const removeAdmin = () => {
		if (socket) {
			socket.emit("removeAdmin", currentChannel, selectedUser?.id);
		}

	};

	const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedUserName = e.target.value;
		const selectedUser = users.find(user => user.username === selectedUserName)
		setSelectedUser(selectedUser);
	}

	return (
		<div className='flex justify-between h-1/5'>
			<h1 className='w-2/5 items-center flex'>suprimer un Admin</h1>
			<select value={selectedUser?.username} onChange={handleUserChange} className='w-32 lg:w-[295px] text-black m-1'>
				<option value=''>-- Sélectionner un utilisateur --</option>
				{users.map((user, index) => (
					<option value={user.username} key={index}>
						{user.username}
					</option>
				))}
			</select>
			<div className='w-10 lg:w-14 flex items-center'>
				{selectedUser &&
					<button onClick={removeAdmin}>valider</button>
				}
			</div>
		</div>
	);
};

export default RemoveAdmin;