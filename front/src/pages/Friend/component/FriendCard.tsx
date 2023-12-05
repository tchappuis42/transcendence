import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../interface/Tools";
import Friend from "../interface/friendDto";
import { useFriends } from "../useFriends";
import { Account } from "../../../ui/types";


// Utilisation de l'interface dans la fonction FriendCard
const FriendCard: React.FC<{ friend: Account }> = ({ friend }) => {

	const navigate = useNavigate();
	const { getStatusColor } = useFriends()

	const handleNav = (id: number) => {
		navigate("/profil", {
			state: {
				id: id
			}
		})
	}

	return (
		<div className="h-1/5 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => handleNav(friend.id)}>
			<div className="h-full w-1/5 flex items-center content-center cursor-pointer">
				<img alt="image de profil" className="rounded-md h-full"
					src={friend.avatar} />
			</div>
			<div className="h-full w-3/5 flex justify-center items-center" >
				<h2>{friend.username}</h2>
			</div>
			<div style={{ background: getStatusColor(friend.status) }} className="h-5 w-5 rounded-full mr-5">
			</div>
		</div>
	);
};

export default FriendCard