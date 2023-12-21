import { Navigate, useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../interface/Tools";
import { useEffect, useState } from "react";
import axios from "axios";
import Friend from "../interface/friendDto";
import { Account } from "../../../ui/types";

const PendingFriendCard = ({ friend }: { friend: Account }) => {
	const navigate = useNavigate();
	// const {account} = useAccount();

	const handleNav = (toNav: string, id: number) => {
		navigate(toNav, {
			state: {
				id: id
			}
		})
	}

	const acceptFriend = async (friendId: Number, accept: boolean) => {
		const data = {
			id: friendId,
			accept: accept
		}
		await axios.post("/api/friends/acceptFriend", data, { withCredentials: true }).then((response) => {
			alert(response.data)
		}).catch((error) => {
			alert(error)
		})

	}

	return (
		<div className="h-1/5 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<div className="h-full w-1/5 flex items-center content-center" onClick={() => { handleNav("profil", friend.id) }}>
				<img alt="image de profil" className="rounded-md h-full"
					src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg" />
			</div>
			<div className="h-full w-4/5 flex justify-center items-center" onClick={() => { handleNav("profil", friend.id) }}>
				<h2>{friend.username}</h2>
			</div>

		</div >
	)
}

export default PendingFriendCard