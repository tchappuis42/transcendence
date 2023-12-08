import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import { useFriends } from '../useFriends';
import FriendCard from "./FriendCard";
import { FriendStatus } from '../interface/friendStatus';
import { Account } from '../../../ui/types';

const Friends = () => {
	const [friends, setFriends] = useState<Account[]>([]);
	const { getFriends, sortByStatus } = useFriends();
	const socket = useSocket();

	useEffect(() => {
		const fetchFriends = async () => {
			const friendsData = await getFriends(FriendStatus.friend);
			if (friendsData)
				setFriends(friendsData);
		};
		fetchFriends();
	}, []);

	useEffect(() => {
		if (socket) {
			socket.on("status", (data) => {
				setFriends((prevFriends) =>
					prevFriends
						.map(user =>
							user.id === data.id ? { ...user, status: data.status } : user)
						.sort((a, b) => b.status - a.status))
			});
			socket.on("friend", (data) => {
				console.log("friend data = ", data)
				const friend = friends.find((friend) => friend.id === data.friend_user.id)
				if (!friend) {
					setFriends((prevFriends) => [...prevFriends, data.friend_user]
						.sort((a, b) => b.status - a.status))
				}
				else
					setFriends((prevFriends) => prevFriends.filter(friend => friend.id !== data.friend_user.id))
			});
		}
		return () => {
			if (socket) {
				socket.off("status");
				socket.off("friend");
			}
		};
	}, [socket, friends, sortByStatus]);

	return (
		<div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Friends ({friends?.length})</h1>
			</div>

			{!friends.length ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "85%" }}>
					<h1 className='text-white/80'>No friends</h1>
				</div>
			) : (

				<div className="h-full m-2.5 bg-black/10 rounded-md	 box-border justify-center items-center overflow-y-auto max-h-[80%]">
					{friends?.map((friend: Account) => (
						<FriendCard key={friend.id} friend={friend} />
					))}
				</div>
			)
			}
		</div>
	)
}

export default Friends;
