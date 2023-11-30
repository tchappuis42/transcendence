import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
interface user {
	id: number
	username: string
	status: number
}

export const useGetUser = () => {
	const [users, setUsers] = useState<user[]>([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("http://localhost:4000/user/users", { withCredentials: true });
				setUsers(response.data)
			} catch (error) {
				console.error("Erreur lors de la récupération des users :", error);
			}
		}
		getUsers();
	}, []);
	return ({users, setUsers});
}

const useUserSorted = (users: user[]) => {
	const [sorted, setSorted] = useState<user[]>([]);
	useEffect(() => {
		const sortUser = users.sort((a, b) => a.status - b.status)
		setSorted(sortUser)
	}, [sorted, users]);

	return ({sorted});
}

const useSocketUser = (setUsers: { (value: React.SetStateAction<user[]>): void; (arg0: (prevUser: any) => any): void; }) => {
	const socket = useSocket();
		useEffect(() => { //socket
		if (socket) {
			socket.on("status", (data) => {
				setUsers((prevUser) => prevUser.map(user => user.username === data.username ? { ...user, status: data.status } : user))
			})
		}
		return () => {
			if (socket) {
				socket.off("status");
			}
		};
	}, [setUsers, socket]);
	return ({socket});
}

function getStatusColor(status: number) {
	switch (status) {
		case 0:
			return 'red'; // Hors ligne
		case 1:
			return 'green'; // En ligne
		case 2:
			return 'orange'; // En jeu (ou tout autre statut)
		default:
			return 'blue'; // Par défaut (au cas où)
	}
}

export const UserStatus = () => {
	const { users, setUsers } = useGetUser();
	const { sorted } = useUserSorted(users);
	const { socket } = useSocketUser(setUsers);

	return ({sorted});
};
