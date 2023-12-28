import { SyntheticEvent } from "react";
import { useSocket } from "../../../ui/organisms/SocketContext";
import { Account } from "../../../ui/types";
import { handleMouseEnter, handleMouseLeave } from "../../HomePage/Tools";
import AvatarContainer from "../../HomePage/CardContent/avatarContainer";
import "./card.css"
import { useNavigate } from "react-router-dom";

interface userInChannel {
	userInChannel: Account;
}

const UserInChannelCard = ({ userInChannel }: userInChannel) => {

	const socket = useSocket();
	const navigate = useNavigate();
	const invitGame = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("GameInvit", userInChannel.id);
		}
	}

	const handleNav = (id: number) => {
		navigate("/profil", {
			state: {
				id: id
			}
		})
	}

	return (
		// <div className="h-full bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
		<div className="main-card border b-slay-200 h-1/6">
			<div id={"chat"} className="avatar-card" onClick={() => handleNav(userInChannel.id)}>
				<AvatarContainer src={userInChannel.avatar} square={10} navigation={false} id_div={"chat"} />
			</div>
			<div className="name-card col-span-2">
				<h2>{userInChannel.username.slice(0, 8)}</h2>
			</div>
			<div className="col-span-2 flex items-center justify-center">
				<button className="bouton1-card " onClick={invitGame}>
					game invit
				</button>
			</div>
		</div>
	);
};

export default UserInChannelCard;