import { SyntheticEvent } from "react";
import { useSocket } from "../../../ui/organisms/SocketContext";
import { Account } from "../../../ui/types";
import { handleMouseEnter, handleMouseLeave } from "../../HomePage/Tools";

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
		<div className="h-full bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="h-full w-1/5 flex items-center content-center cursor-pointer">
				<img alt="image de profil" className="rounded-md h-full"
					src={userInChannel.avatar} />
			</div>
			<div className="h-full w-2/5 flex justify-center items-center">
				<h2>{userInChannel.username.slice(0, 8)}</h2>
			</div>
			<button className="w-1/5 border" onClick={invitGame}>game invit</button>
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