import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../interface/Tools";
import Friend from "../interface/friendDto";
import { useFriends } from "../useFriends";
import { Account } from "../../../ui/types";
import AvatarContainer from "../../HomePage/CardContent/avatarContainer";


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
		<div id={"friendCard"} className="h-1/5 bg-white/50 m-2 rounded-md shadow-lg box-border flex justify-between items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => handleNav(friend.id)}>
			<AvatarContainer src={friend.avatar} navigation={true} id={friend.id} id_div="friendCard" />
			<div className="h-full w-3/5 flex justify-center items-center" >
				{friend.username.length <= 10 ? (
					<h2>{friend.username}</h2>
				) : (
					<h2>{friend.username.slice(0, 10)}.</h2>
				)}
			</div>
			<div style={{ background: getStatusColor(friend.status) }} className="h-5 w-5 rounded-full mr-5">
			</div>
		</div>
	);
};

export default FriendCard