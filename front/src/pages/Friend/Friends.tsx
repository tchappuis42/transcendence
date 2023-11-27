import React, { useEffect, useState } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';
import Friend from './interface/friendDto';
import { useFriends } from './useFriends';
import FriendCard from "./FriendCard";
import { FriendStatus } from './interface/friendStatus';

const Friends = () => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const { getFriends } = useFriends();
	const socket = useSocket();
	console.log(socket)

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
			console.log("la")
			socket.on("status", (data) => {
				setFriends((prevFriends) => prevFriends.map(user => user.id === data.id ? { ...user, status: data.status } : user))
			});
			socket.on("friend", (data) => {
				if (data.accept === true)
					setFriends((prevFriends) => [...prevFriends, data.friend])
				else
					setFriends((prevFriends) => prevFriends.filter(friend => friend.id !== data.friend.id))
			});
		}
		return () => {
			if (socket) {
				socket.off("status");
			}
		};
	}, [socket]);

	/*useEffect(() => {
		const sortUser = users.sort((a, b) => a.status - b.status)
		setSorted(sortUser)
	}, [friends]);*/

	return (
		<div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Friends ({friends?.length})</h1>
			</div>

			{!friends ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1>No friends</h1>
				</div>
			) : (

				<div className="h-full m-2.5 bg-black/10 rounded-md	shadow-md shadow-white box-border justify-center items-center overflow-y-auto max-h-[80%]">
					{friends?.map((friend: Friend) => (
						<FriendCard key={friend.id} friend={friend} />
					))}
				</div>
			)
			}
		</div>
	)
}

export default Friends;
