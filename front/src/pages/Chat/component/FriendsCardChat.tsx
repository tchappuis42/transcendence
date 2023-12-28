import { useNavigate } from "react-router-dom";
import { useFriends } from "../../Friend/useFriends";
import { SyntheticEvent } from "react";
import { useSocket } from "../../../ui/organisms/SocketContext";
import { Account } from "../../../ui/types";
import AvatarContainer from "../../HomePage/CardContent/avatarContainer";
import { handleMouseEnter, handleMouseLeave } from "../../Friend/interface/Tools";
import "./card.css"

const FriendCardChat: React.FC<{ friend: Account, set_channel: string }> = ({ friend, set_channel }) => {
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
	// h-1/6 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer
	return (
		<div className="main-card b-slay-200"
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
		>
			<div id={"chat"} className="avatar-card">
				<AvatarContainer src={friend.avatar} square={10} navigation={false} id_div={"chat"}/>
			</div>
			<div className="name-card col-span-3" onClick={() => handleNav(friend.id)}>
				{friend.username.length >= 15 ? (
					<h2>{friend.username.slice(0, 15)}...</h2>
				) : (
					<h2>{friend.username}</h2>
				)

				}
			</div>
			<div className="col-span-1 h-full w-full flex justify-center items-center p-2">
				{set_channel.length ? (
					<div
						className="h-8 w-10 rounded flex justify-center items-center cursor-pointer border-1"
						style={{
							borderWidth: 1,
							borderColor: getStatusColor(friend.status),
							transition: 'background-color 0.3s',
						}}
						onMouseOver={(e) => { e.currentTarget.style.backgroundColor = getStatusColor(friend.status); }}
						onMouseOut={(e) => { e.currentTarget.style.backgroundColor = ''; }}
						onClick={createDMChannel}
					>
						<h3 className="text-black">DM</h3>
					</div>
				) : (
					<div
						className="h-5 w-10 rounded-md flex bg-red-200 justify-center items-center border-1"
						style={{
							background: getStatusColor(friend.status),
						}}
					>

					</div>
				)}
			</div>

		</div>
	);
};

export default FriendCardChat