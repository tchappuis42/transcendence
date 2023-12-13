import { Account } from "../../../ui/types";
import { handleMouseEnter, handleMouseLeave } from "../../HomePage/Tools";

interface userInChannel {
	userInChannel: Account;
}

const UserInChannelCard = ({ userInChannel }: userInChannel) => {
	return (
		<div className="h-1/5 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="h-full w-1/5 flex items-center content-center cursor-pointer">
				<img alt="image de profil" className="rounded-md h-full"
					src={userInChannel.avatar} />
			</div>
			<div className="h-full w-3/5 flex justify-center items-center">
				<h2>{userInChannel.username.slice(0, 8)}</h2>
			</div>
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