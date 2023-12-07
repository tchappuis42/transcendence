import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { useFriends } from '../../Friend/useFriends';
import axios from 'axios';
import FriendCardChat from './FriendsCardChat';
import { Account } from '../../../ui/types';

interface channel {
	set_channel: string;
}

const FriendsChat = ({ set_channel }: channel) => {
	const [users, setUsers] = useState<Account[]>([]);
	const { sortByStatus } = useFriends();
	const socket = useSocket();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("http://localhost:4000/user/users", { withCredentials: true });
				const sortedUsers = response.data.sort((a: Account, b: Account) => b.status - a.status);

				setUsers(sortedUsers);
			} catch (error) {
				console.error("Erreur lors de la récupération des users :", error);
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
		<div className="bg-black/50 h-full w-full rounded-md" >
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Users ({users?.length})</h1>
			</div>

			{!users ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1>No users</h1>
				</div>
			) : (

				<div className="h-[90%] overflow-y-auto overflow-x-hidden">
					{users?.map((user: Account) => (
						<FriendCardChat key={user.id} friend={user} set_channel={set_channel} />
					))}
				</div>
			)
			}
		</div>
	)
}

export default FriendsChat;
