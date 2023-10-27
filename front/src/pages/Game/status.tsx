import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';

interface user {
	id: number
	username: string
	status: number
}

const Status = () => {

	const [users, setUsers] = useState<user[]>([]);
	const [sorted, setSorted] = useState<user[]>([]);
	const socket = useSocket();

	useEffect(() => {
		const sortUser = users.sort((a, b) => a.status - b.status)
		setSorted(sortUser)
		console.log("le trie", sorted)
	}, [users]);


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

	function getStatusColor(status: number) {
		switch (status) {
			case 0:
				return 'blue'; // Hors ligne
			case 1:
				return 'green'; // En ligne
			case 2:
				return 'red'; // En jeu (ou tout autre statut)
			default:
				return 'black'; // Par défaut (au cas où)
		}
	}

	const addFrind = async (userId: number) => {
		const data = {
			id: userId,
		}
		await axios.post("http://localhost:4000/friends/addFriend", data, { withCredentials: true }).then((response) => {
			alert(response.data)
		}).catch((error) => {
			alert(error)
		})
	}

	return (
		<div className="status">
			<h1>Liste des Users</h1>
			{sorted.map(u =>
				<p style={{ color: getStatusColor(u.status) }} key={u.id}>
					{u.username}
					<button onClick={() => addFrind(u.id)} style={{ marginLeft: "5px" }}>add</button>
				</p>)}
		</div>
	);
};

export default Status;