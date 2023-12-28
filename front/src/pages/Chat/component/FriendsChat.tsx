import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { useFriends } from '../../Friend/useFriends';
import axios from 'axios';
import FriendCardChat from './FriendsCardChat';
import { Account } from '../../../ui/types';
import { useAuth } from '../../../ui/organisms/useAuth';

interface channel {
	currentChannel: string;
}

const FriendsChat = ({ currentChannel }: channel) => {
	const [users, setUsers] = useState<Account[]>([]);
	const { sortByStatus } = useFriends();
	const socket = useSocket();
	const { authenticate } = useAuth();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("/api/user/users", { withCredentials: true });
				const sortedUsers = response.data.sort((a: Account, b: Account) => b.status - a.status);

				setUsers(sortedUsers);
			} catch (error: any) {
				console.error("Erreur lors de la récupération des users :", error);
				if (error.response.request.status === 401)
					authenticate();
			}
		}
		getUsers();
	}, []);


	useEffect(() => {
		if (socket) {
			socket.on("status", (data) => {
				setUsers((prevFriends) =>
					prevFriends
						.map(user =>
							user.id === data.id ? { ...user, status: data.status } : user)
						.sort((a, b) => b.status - a.status))
			});
		}

		return () => {
			if (socket) {
				socket.off("status");
			}
		};
	}, [socket, users, sortByStatus]);

	return (
		<div className="m-card">
			<div className='header-card'>
				<h1>Users ({users?.length})</h1>
			</div>

			{!users ? (
				<div className="body-card">
					<h1>No users</h1>
				</div>
			) : (
				<div className="body-card">
					{users?.map((user: Account) => (
						<FriendCardChat key={user.id} friend={user} set_channel={currentChannel} />
					))}
				</div>
			)
			}
		</div>
	)
}

export default FriendsChat;
