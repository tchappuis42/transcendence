import { Account } from '../../../ui/types';
import { SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import FriendCardChat from './FriendsCardChat';
import GameInvit from './GameInvit';
import UserInChannelCard from './UserInChannelCard';
import { useSocket } from '../../../ui/organisms/SocketContext';

interface userInChannel {
	userInChannel: Account[];
}

const UserInChannel = ({ userInChannel }: userInChannel) => {

	const socket = useSocket();
	const navigate = useNavigate();


	const JoinGame = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket)
			socket.emit("JoinGame");
		navigate("/pong")
	}

	const InvitGame = (userId: number) => {
		const find = userInChannel.find(user => user.id === userId)
		if (find)
			return true
		return false
	}


	return (
		<div className="bg-black/50 h-full w-full rounded-md " >
			<div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
				<h1>user in channel ({userInChannel?.length})</h1>
			</div>
			{!userInChannel ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1>No users</h1>
				</div>
			) : (
				<div className="h-full m-2.5 bg-black/10 rounded-md	box-border justify-center items-center overflow-y-auto max-h-[80%]">
					{userInChannel?.map((userIn: Account) => (
						<div>
							{InvitGame(userIn.id) ? (<UserInChannelCard key={userIn.id} userInChannel={userIn} />) : (
								<div className="h-1/5 bg-blue-500/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer">
									<div className="h-full w-1/5 flex items-center content-center cursor-pointer">
										<img alt="image de profil" className="rounded-md h-full"
											src={userIn.avatar} />
									</div>
									<div className="h-full w-2/5 flex justify-center items-center">
										<h2>{userIn.username.slice(0, 8)}</h2>
									</div>
									<button className="w-1/5 border" onClick={JoinGame}>rejoindre la partie</button>
								</div>)
							}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default UserInChannel;
//

//socket.on un tableau des demande de game
// fonction qui check si dans le tableau des demande de game et retourn un bool