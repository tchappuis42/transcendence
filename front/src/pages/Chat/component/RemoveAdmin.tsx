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
	});

	const addAdmin = () => {
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
		<div className='flex justify-between'>
			<h1>suprimer un Admin</h1>
			<select value={selectedUser?.username} onChange={handleUserChange} className='w-32 text-black'>
				<option value=''>-- Sélectionner un utilisateur --</option>
				{users.map((user, index) => (
					<option value={user.username} key={index}>
						{user.username}
					</option>
				))}
			</select>
			{selectedUser &&
				<button onClick={addAdmin}>valider</button>
			}
		</div>
	);
};

export default RemoveAdmin;