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
						<div className='h-1/5'>
							{InvitGame(userIn.id) ? (<UserInChannelCard key={userIn.id} userInChannel={userIn} />) : (
								<div className="h-full bg-blue-500/50 grid grid-cols-6 gap-4 rounded-md m-2.5 px-5 cursor-pointer">
									<div className="h-full w-full overflow-hidden flex col-span-1 items-center content-center cursor-pointer">
										<img alt="image de profil" className="h-full w-[60px] object-cover"
											src={userIn.avatar} />
									</div>
									<div className="h-full w-full flex col-span-3 justify-center items-center text-white">
										<h2>{userIn.username.slice(0, 8)}</h2>
									</div>
									<button className="
										w-full border m-2 rounded col-span-2 bg-transparent 
										hover:bg-blue-500/40 hover:no-underline hover:text-white
										focus:outline-none focus:ring focus:ring-blue-500/30
										active:bg-blue-500/30 text-white"
									onClick={(e) => JoinGame(e, userIn.id)}>
										rejoindre la partie
									</button>
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