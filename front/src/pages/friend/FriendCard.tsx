import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "./interface/Tools";
import Friend from "./interface/friendDto";
import { useFriends } from "./useFriends";


// Utilisation de l'interface dans la fonction FriendCard
const FriendCard: React.FC<{ friend: Friend }> = ({ friend }) => {

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
		<div className="h-[15%] bg-white/50 m-2.5 ease-in-out duration-300 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => handleNav(friend.id)}>
			<div className="h-[90%] w-1/5 flex items-center content-center cursor-pointer">
				<img alt="image de profil" className="rounded-xl h-full"
					src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg" />
			</div>
			<div className="friendName" >
				<h2 style={{ fontSize: "100%" }}>{friend.username}</h2>
			</div>

			<div style={{ height: "60%", width: "10%", borderRadius: "100%", background: getStatusColor(friend.status), marginRight: 20 }}>
			</div>
		</div>
	);
};

export default FriendCard