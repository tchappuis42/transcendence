import { Account } from '../../../ui/types';
import FriendCardChat from './FriendsCardChat';
import UserInChannelCard from './UserInChannelCard';

interface userInChannel {
	userInChannel: Account[];
}

const UserInChannel = ({ userInChannel }: userInChannel) => {
	return (
		<div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white" >
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>Users ({userInChannel?.length})</h1>
			</div>
			{!userInChannel ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1>No users</h1>
				</div>
			) : (

				<div className="h-full m-2.5 bg-black/10 rounded-md	shadow-md shadow-white box-border justify-center items-center overflow-y-auto max-h-[80%]">
					{userInChannel?.map((userIn: Account) => (
						<UserInChannelCard key={userIn.id} userInChannel={userIn} />
					))}
				</div>
			)}\
		</div>
	);
};

export default UserInChannel;