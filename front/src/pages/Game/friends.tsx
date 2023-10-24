import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';

interface friend {
	username: string
	status: boolean
	friend_status: boolean
}

const Friends = () => {

	const [friends, setFriends] = useState<friend[]>([]);
	const socket = useSocket();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("http://localhost:4000/friends/friends", { withCredentials: true });
				console.log("data = ", response.data)
				setFriends(response.data)
			} catch (error) {
				console.error("Erreur lors de la récupération des users :", error);
			}
		}
		getUsers();
	}, []);


	useEffect(() => { //socket
		if (socket) {
			socket.on("status", (data) => {
				console.log(data)
				setFriends((prevUser) => prevUser.map(user => user.username === data.username ? { ...user, status: data.status } : user))
			})
		}
		return () => {
			if (socket) {
				socket.off("status");
			}
		};
	}, [socket]);

	return (
		<div className="status">
			<h1>Liste des amis</h1>
			{friends.map(u => <p style={{ color: u.status ? 'green' : 'red' }}>{u.username}</p>)}
		</div>
	);
};

export default Friends;