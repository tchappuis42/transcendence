import { SyntheticEvent } from "react";
import { useSocket } from "../../../ui/organisms/SocketContext";
import { Account } from "../../../ui/types";
import { handleMouseEnter, handleMouseLeave } from "../../HomePage/Tools";
import AvatarContainer from "../../HomePage/CardContent/avatarContainer";
import "./card.css"

interface userInChannel {
	userInChannel: Account;
}

const UserInChannelCard = ({ userInChannel }: userInChannel) => {

	const socket = useSocket();

	const invitGame = (e: SyntheticEvent) => {
		e.preventDefault();

		if (socket) {
			socket.emit("GameInvit", userInChannel.id);
		}
	}

	return (
		// <div className="h-full bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
		<div className="main-card border b-slay-200" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div id={"chat"} className="avatar-card">
				<AvatarContainer src={userInChannel.avatar} square={10} navigation={false} id_div={"chat"}/>
			</div>
			<div className="name-card col-span-2">
				<h2>{userInChannel.username.slice(0, 8)}</h2>
			</div>
			{/* className="col-span-1 h-full w-full flex justify-center items-center"> */}
			<button className="bouton1-card min-w-[80px]" onClick={invitGame}>
				game invit
			</button>
		</div>
	);
};

export default UserInChannelCard;

//	const test = server.sockets.adapter.rooms.get(element.name);
//console.log("testetstets = ", test)


/*
envois au back le nom du channel et l'id de l'user

cherche dans les socket du channel la socket de l'id et emit une demande de jeu check si je suis deja en recherche suprime les autres
si le jouer accepte creer un room de jeu et redirige sur pong ou fais rien
*/

//joueur ressois la demande a la place du joeur en quetion une carte bleu avec tete invitation a game au clic envois le oui et redirige vers la game