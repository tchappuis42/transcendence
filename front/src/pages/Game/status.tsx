import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface user {
	username: string
	status: string
}

const Status = () => {

	const [users, setUsers] = useState<user[]>([]);

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get<string[]>("http://localhost:4000/user/users", { withCredentials: true });
				const updateUsers: user[] = response.data.map((username) => ({ username, status: 'offline' }))
				setUsers(updateUsers)
			} catch (error) {
				console.error("Erreur lors de la récupération de l'historique des matchs :", error);
			}
		}
		getUsers();
	}, []);

	useEffect(() => {

	}, []);

	return (
		<div className="status">
			<h1>Liste des Users</h1>
			{users.map(u => <p>{u.username} {u.status}</p>)}
		</div>
	);
};

export default Status;