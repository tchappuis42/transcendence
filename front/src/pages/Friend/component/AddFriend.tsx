import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import Friend from '../interface/friendDto';
import { useFriends } from '../useFriends';
import { FriendStatus } from '../interface/friendStatus';
import FriendRequestCard from './AddFriendCard';
import { Account } from '../../../ui/types';


const FriendsToAdd = () => {
	const [friends, setFriends] = useState<Account[]>([]);
	const { getFriends } = useFriends();
	const socket = useSocket();

	const removeCard = (id: number) => {
		setFriends((prevFriends) => prevFriends.filter(friend => friend.id !== id))
	}

	useEffect(() => {
		const fetchFriends = async () => {
			const friendsData = await getFriends(FriendStatus.to_add);
			if (friendsData)
				setFriends(friendsData);
		};
		fetchFriends();
	}, []);

	useEffect(() => {
		
		if (socket) {
			socket.on("friendRequest", (data) => {
				setFriends((prevFriends) => [...prevFriends, data])
			});
		}
		return () => {
			if (socket) {
				socket.off("friendRequest");
			}
		};
	}, [socket]);

	return (
		<div className="m-card bg-gray-200/60">
			<div className='header-card'>
				<h1>Friends Request ({friends?.length})</h1>
			</div>

			{!friends.length ? (
				<div className="flex h-5/6 justify-center items-center">
					<h1 className='text-black/90 opacity-50'>No new friends request</h1>
				</div>
			) : (
				<div className="h-full m-2.5 bg-black/10 rounded-md box-border justify-center items-center overflow-y-auto max-h-[80%]">
					{friends?.map((friend: Account) => (
						<FriendRequestCard key={friend.id} friend={friend} removeCard={removeCard} />
					))}
				</div>
			)
			}
		</div>
	)
}
export default FriendsToAdd;