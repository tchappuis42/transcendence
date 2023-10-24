import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';

interface user {
	username: string
	status: boolean
}

const Status = () => {

	const [users, setUsers] = useState<user[]>([]);
	const socket = useSocket();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("http://localhost:4000/user/users", { withCredentials: true });
				console.log("data = ", response.data)
				setUsers(response.data)
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
				setUsers((prevUser) => prevUser.map(user => user.username === data.username ? { ...user, status: data.status } : user))
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
			<h1>Liste des Users</h1>
			{users.map(u => <p style={{ color: u.status ? 'green' : 'red' }}>{u.username}</p>)}
		</div>
	);
};

export default Status;