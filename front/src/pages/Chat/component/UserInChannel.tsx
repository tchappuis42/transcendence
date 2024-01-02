import { Account } from '../../../ui/types';
import { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInChannelCard from './UserInChannelCard';
import { useSocket } from '../../../ui/organisms/SocketContext';

interface userInChannel {
	userInChannel: Account[];
}

const UserInChannel = ({ userInChannel }: userInChannel) => {

	const socket = useSocket();
	const navigate = useNavigate();
	const [gameInvit, setGameInvit] = useState<number[]>([]);


	const JoinGame = (e: SyntheticEvent, userid: number) => {
		e.preventDefault();

		if (socket)
			socket.emit("JoinGame", userid);
	}

	const InvitGame = (userId: number) => {
		const find = gameInvit.find(invit => invit === userId)
		if (find)
			return false
		return true
	}

	useEffect(() => {
		if (socket) {
			socket.on("GameInvit", (data) => {
				if (typeof data !== 'number')
					setGameInvit((prevInvit) => [...prevInvit, data.id])
			});
			socket.on("JoinGame", (data) => {
				if (typeof data === 'boolean')
					navigate("/pong")
				else {
					setGameInvit((prevInvit) => prevInvit.filter(id => id !== data))
				}
			});
		}
		return () => {
			if (socket) {
				socket.off("GameInvit");
				socket.off("JoinGame");
			}
		};
	}, [socket]);

	return (
		<div className="m-card border-slate-300">
			<div className='header-card'>
				<h1>user in channel ({userInChannel?.length})</h1>
			</div>
			{!userInChannel ? (
				<div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
					<h1>No users</h1>
				</div>
			) : (
				<div className="max-h-[90%] m-1
				rounded-md gap-5
				box-border justify-center items-center 
				overflow-y-auto">
					{userInChannel?.map((userIn: Account) => (
						<div className='h-[90%]'>
							{InvitGame(userIn.id) ? (<UserInChannelCard key={userIn.id} userInChannel={userIn} />) : (
								<div className="main-card bg-blue-100">
									<div className="avatar-card w-full">
										<img alt="image de profil" className="h-full w-full object-cover"
											src={userIn.avatar} />
									</div>
									<div className="name-card w-full">
										<h2>{userIn.username.slice(0, 8)}</h2>
									</div>
									<div className="col-span-2 flex items-center justify-center">
										<button className="bouton-join-game-card border-slay-200 text-black/60"
										onClick={(e) => JoinGame(e, userIn.id)}>
											join game
										</button>
									</div>
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