import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { FriendStatus } from '../../Friend/interface/friendStatus';
import FriendCard from '../../Friend/FriendCard';
import { useFriends } from '../../Friend/useFriends';
import Friend from '../../Friend/interface/friendDto';
import axios from 'axios';

interface Users {
    username : string;
    id : number;
    friend_status : number;
    status : number;
}

const FriendsChat = () => {
	const [users, setUsers] = useState<Users[]>([]);
	const { getFriends, sortByStatus } = useFriends();
	const socket = useSocket();

	useEffect(() => {
		const getUsers = async () => {
			try {
				const response = await axios.get("http://localhost:4000/user/users", { withCredentials: true });
				// setUsers(response.data)
                console.log("respons : ", response.data);
                setUsers(response.data)
			} catch (error) {
				console.error("Erreur lors de la récupération des users :", error);
			}
		}
		getUsers();
	}, []);


	// useEffect(() => {
	// 	if (socket) {
	// 		socket.on("status", (data) => {
	// 			setUsers((prevFriends) =>
	// 				prevFriends
	// 					.map(user =>
	// 						user.id === data.id ? { ...user, status: data.status } : user)
	// 					.sort((a, b) => b.status - a.status))
	// 		});
	// 		socket.on("friend", (data) => {
	// 			const friend = friends.find((friend) => friend.id === data.id)
	// 			if (!friend) {
	// 				setUsers((prevFriends) => [...prevFriends, data]
	// 					.sort((a, b) => b.status - a.status))
	// 			}
	// 			else
	// 				setUsers((prevFriends) => prevFriends.filter(friend => friend.id !== data.id))
	// 		});
	// 	}

	// 	return () => {
	// 		if (socket) {
	// 			socket.off("status");
	// 			socket.off("friend");
	// 		}
	// 	};
	// }, [socket, friends, sortByStatus]);

	return (
		<div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Friends ({users?.length})</h1>
			</div>

			{!users ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1>No users</h1>
				</div>
			) : (

				<div className="h-full m-2.5 bg-black/10 rounded-md	shadow-md shadow-white box-border justify-center items-center overflow-y-auto max-h-[80%]">
					{users?.map((user: Users) => (
						<FriendCard key={user.id} friend={user} />
					))}
				</div>
			)
			}
		</div>
	)
}

export default FriendsChat;
