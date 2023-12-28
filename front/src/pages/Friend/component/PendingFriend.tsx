import React, { useEffect, useState } from 'react';
import { useSocket } from '../../../ui/organisms/SocketContext';
import Friend from '../interface/friendDto';
import { useFriends } from '../useFriends';
import FriendCard from "./FriendCard";
import { FriendStatus } from '../interface/friendStatus';
import PendingFriendCard from './PendingFriendCard';
import { Account } from '../../../ui/types';

const PendingFriend = () => {
	const [friends, setFriends] = useState<Account[]>([]);
	const { getFriends } = useFriends();
	const socket = useSocket();

	useEffect(() => {
		const fetchFriends = async () => {
			const friendsData = await getFriends(FriendStatus.pendding);
			if (friendsData)
				setFriends(friendsData);
		};
		fetchFriends();
	}, []);

	return (
		<div className="bg-black/50 h-full w-full rounded-md shadow-md shadow">
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Pending Friend Request ({friends?.length})</h1>
			</div>

			{!friends ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1>No friends</h1>
				</div>
			) : (

				<div className="h-full m-2.5 bg-black/10 rounded-md	shadow-md shadow-mdbox-border justify-center items-center overflow-y-auto max-h-[80%]">
					{friends?.map((friend: Account) => (
						<PendingFriendCard key={friend.id} friend={friend} />
					))}
				</div>
			)
			}
		</div>
	)
}
export default PendingFriend;