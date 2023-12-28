import axios from 'axios';
import Friend from './interface/friendDto';
import { Account } from '../../ui/types';
import { useAuth } from '../../ui/organisms/useAuth';

export function useFriends() {
	const { authenticate } = useAuth();

	const sortByStatus = (friends: Friend[], friendStatus: number): Account[] => {
		const sortedFriends = friends.sort((a, b) => b.friend_user.status - a.friend_user.status);
		const filteredFriends = sortedFriends.filter(friend => friend.friend_status === friendStatus);
		const friend = filteredFriends.map((f) => { return f.friend_user })
		return friend;
	};

	const getFriends = async (friendStatus: number) => {
		try {
			const response = await axios.get("/api/friends/friends", { withCredentials: true });
			const sortedFriends = sortByStatus(response.data, friendStatus);
			return sortedFriends
		} catch (error: any) {
			console.error("Erreur lors de la récupération des users :", error);
			if (error.response.request.status === 401)
				authenticate();
		}
	}

	function getStatusColor(status: number) {
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
		getFriends,
		sortByStatus
	}
}