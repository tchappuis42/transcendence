import { useNavigate } from "react-router-dom";


import { handleMouseEnter, handleMouseLeave } from "../../HomePage/Tools";
import Friend from "../../Friend/interface/friendDto";
import { useFriends } from "../../Friend/useFriends";
import { SyntheticEvent } from "react";
import { useSocket } from "../../../ui/organisms/SocketContext";


// interface Channel {
// 	set_channel : string;
// }

// Utilisation de l'interface dans la fonction FriendCard
const FriendCardChat: React.FC<{ friend: Friend, set_channel: string }> = ({ friend, set_channel }) => {
	const socket = useSocket();
	const navigate = useNavigate();
	const { getStatusColor } = useFriends()

	const handleNav = (id: number) => {
		navigate("/profil", {
			state: {
				id: id
			}
		})
	}

	const createDMChannel = (e: SyntheticEvent) => {
		e.preventDefault();
			if (socket) {
				socket.emit("createDMChannel", friend.id, set_channel);
		}
	}

	return (
		<div className="h-1/5 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="h-full w-1/5 flex items-center content-center cursor-pointer" onClick={() => handleNav(friend.id)}>
				<img alt="image de profil" className="rounded-md h-full"
					src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg" />
			</div>
			<div className="h-full w-3/5 flex justify-center items-center" onClick={() => handleNav(friend.id)} >
				<h2>{friend.username.slice(0,8)}</h2>
			</div>
			<div
				className="h-5 w-10 rounded-md mr-5 flex justify-center items-center cursor-pointer border-1"
				style={{
					borderWidth: 1,
					borderColor: getStatusColor(friend.status),
					transition: 'background-color 0.3s',
				}}
				onMouseOver={(e) => { e.currentTarget.style.backgroundColor = getStatusColor(friend.status); }}
				onMouseOut={(e) => { e.currentTarget.style.backgroundColor = ''; }}
				onClick={createDMChannel}
				>
				<h3 className="text-white">DM</h3>
			</div>

		</div>
	);
};

export default FriendCardChat