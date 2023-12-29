import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';

interface user {
	id: number
	username: string
	status: number
}

export const addFrind = async (userId: number | undefined) => {
	const data = {
		id: userId,
	}
	await axios.post("/api/friends/addFriend", data, { withCredentials: true }).then((response) => {
	}).catch((error) => {
		console.error("error while adding friend :", error);
	})
}

const Status = () => {
	const socket = useSocket();
	const [users, setUsers] = useState<user[]>([]);
	const [sorted, setSorted] = useState<user[]>([]);


	useEffect(() => {
		if (socket) {
			socket.on("status", (data) => {
				//setUsers((prevUser) => prevUser.map(user => user.username === data.username ? { ...user, status: data.status } : user))
			})
		}
		return () => {
			if (socket) {
				socket.off("status");
			}
		};
	}, [socket]);

	useEffect(() => {
		const sortUser = users.sort((a, b) => a.status + b.status)
		setSorted(sortUser)
	}, [users]);


	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("/api/user/users", { withCredentials: true });
				setUsers(response.data)
			} catch (error) {
				console.error("Erreur lors de la récupération des users :", error);
			}
		}
		getUsers();
	}, []);




	function getStatusColor(status: number) {
		switch (status) {
			case 0:
				return 'red'; // Hors ligne
			case 1:
				return 'green'; // En ligne
			case 2:
				return 'blue'; // En jeu (ou tout autre statut)
			default:
				return 'black'; // Par défaut (au cas où)
		}
	}
	const addFrind = async (userId: number) => {
		const data = {
			id: userId,
		}
		await axios.post("/api/friends/addFriend", data, { withCredentials: true }).then((response) => {
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