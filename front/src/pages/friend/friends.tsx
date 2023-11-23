import React, { useEffect, useState } from 'react';
import { useSocket } from '../../ui/organisms/SocketContext';
import Friend from './interface/friendDto';
import { useFriends } from './useFriends';
import FriendCard from "./FriendCard";

const Friends = () => {
	const [friends, setFriends] = useState<Friend[]>([]);
	const { getFriends } = useFriends()

	useEffect(() => {
		const fetchFriends = async () => {
			const friendsData = await getFriends();
			if (friendsData)
				setFriends(friendsData);
		};
		fetchFriends();
	}, []);

	return (
		<div className="bg-gray-300">
			<div className='h-[10%] flex justify-center items-center m-2.5 rounded-md shadow-lg bg-white/10'>
				<h1>Friends ({friends?.length})</h1>
			</div>

			{!friends ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1>No friends</h1>
				</div>
			) : (

				<div className="h-full m-2.5 bg-black/10 rounded-md	shadow-lg box-border justify-center items-center overflow-y-auto max-h-[80%]">
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
