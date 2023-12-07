import Friends from "./component/Friends";
import FriendsToAdd from "./component/AddFriend";
import { useEffect, useState } from 'react';
import PendingFriend from "./component/PendingFriend";
import Status from "./teststatus";
import axios from "axios";

const Testfriends = () => {


	const [friend, setFriend] = useState<string>("")
	const userId = 2
	useEffect(() => {

		const getFriends = async () => {
			try {
				const response = await axios.get(`http://localhost:4000/friends/getFriendParId/${userId}`, { withCredentials: true });
				if (response.data.friend_status === 0)
					setFriend("supprimer")
				else if (response.data.friend_status === 1)
					setFriend("accpeter la demande")
				else if (response.data.friend_status === 2)
					setFriend("pending")
				else
					setFriend("ajouter")
			} catch (error) {
				console.error("Erreur lors de la récupération de l'historique des matchs :", error);
			}
		}
		getFriends();
	}, []);

	return (
		<div className="w-full h-[800px] p-20">
			<div className="grid gap-2 grid-cols-2 grid-rows-2 w-full h-full">
				<div className="h-full w-full p-2.5 bg-black/50 rounded-xl">
					<Friends />
				</div>
				<div className="h-full w-full p-2.5 bg-black/50 rounded-xl">
					<FriendsToAdd />
				</div>
				<div className="h-full w-full p-2.5 bg-black/50 rounded-xl">
					<PendingFriend />
				</div>
				<div className="h-full w-full p-2.5 bg-black/50 rounded-xl">
					{friend}
				</div>
				<Status></Status>
			</div>
		</div>
	)
}
export default Testfriends;