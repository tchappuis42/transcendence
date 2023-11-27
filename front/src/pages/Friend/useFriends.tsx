import axios from 'axios';
import Friend from './interface/friendDto';

export function useFriends() {

	const sortByStatus = (friends: Friend[], friendStatus: number): Friend[] => {
		const sortedFriends = friends.sort((a, b) => b.status + a.status);
		const filteredFriends = sortedFriends.filter(friend => friend.friend_status === friendStatus);
		return filteredFriends;
	};

	const getFriends = async (friendStatus: number) => {
		try {
			const response = await axios.get("http://localhost:4000/friends/friends", { withCredentials: true });
			const sortedFriends = sortByStatus(response.data, friendStatus);
			return sortedFriends
		} catch (error) {
			console.error("Erreur lors de la récupération des users :", error);
		}
	}

	function getStatusColor(status: number) {
		console.log("color =", status)
		switch (status) {
			case 0:
				return 'red'; // Hors ligne
			case 1:
				return 'green'; // En ligne
			case 2:
				return 'blue'; // En jeu
			default:
				return 'black'; // Par défaut (au cas où)
		}
	}

	return {
		getStatusColor,
		getFriends
	}
}