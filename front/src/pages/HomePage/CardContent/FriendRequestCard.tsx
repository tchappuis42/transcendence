import { Navigate, useNavigate } from "react-router-dom";
import { useAccount } from "../../../ui/organisms/useAccount";
import { handleMouseEnter, handleMouseLeave } from "../Tools";
import { useEffect, useState } from "react";
import axios from "axios";

interface friend {
    id : number;
    username : string;
    status : number;
    friend_status : number;
}

const FriendRequestCard = ({ friend }: { friend: friend }) => {
    const navigate = useNavigate();
    const {account} = useAccount();



    const handleNav = (toNav : string, id : number) => {
        navigate(toNav, {
            state : {
                id : id
            }
        })
    }

    const acceptFriend = async (friendId : Number, accept : boolean) => {
        const data = {
			id: friendId,
			accept: accept
		}
		await axios.post("/api/friends/acceptFriend", data, { withCredentials: true }).then((response) => {
		}).catch((error) => {
			console.error("error while adding friend : ", error)
		})

    }

    return (
        <div className="messageContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="messagePicContainer" onClick={() => {handleNav("profil", friend.id)}}>
            <img alt="image de profil" style={{borderRadius:"10%", height:"100%"}}
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
            </div>
            <div className="friendRequestName"  onClick={() => {handleNav("profil", friend.id)}}>
                <h2 style={{fontSize:"100%"}}>{friend.username}</h2>
            </div>
            <div className="friendRequestBtnContainer">
                <button className="addBtn" onClick={() => {acceptFriend(friend.id, true)}}>Accept</button>
                <button className="refuseBtn" onClick={() => {acceptFriend(friend.id, false)}}>Refuse</button>

            </div>
        </div>
    )
}

export default FriendRequestCard