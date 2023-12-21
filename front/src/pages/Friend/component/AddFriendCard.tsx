import { Navigate, useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../interface/Tools";
import { useEffect, useState } from "react";
import axios from "axios";
import Friend from "../interface/friendDto";
import { Account } from "../../../ui/types";
import { fireEvent } from "@testing-library/react";
import AvatarContainer from "../../HomePage/CardContent/avatarContainer";

const FriendRequestCard = ({ friend, removeCard }: { friend: Account, removeCard: (id: number) => void }) => {

    const navigate = useNavigate();

    const handleNav = (toNav: string, id: number) => {
        navigate(toNav, {
            state: {
                id: id
            }
        })
    }

    const acceptFriend = async (friendId: number, accept: boolean) => {
        const data = {
            id: friendId,
            accept: accept
        }
        await axios.post("/api/friends/acceptFriend", data, { withCredentials: true }).then((response) => {
            removeCard(friendId)
        }).catch((error) => {
            console.error("error while handling friend request :", error)
        })
    }

    return (
        <div className="h-1/5 bg-white/50 m-2.5 rounded-md shadow-lg box-border flex justify-around items-center cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div id={"addFriendCard"} className="h-full w-1/5 flex items-center content-center" onClick={() => { handleNav("profil", friend.id) }}>
               <AvatarContainer src={friend.avatar} navigation={true} id={friend.id} square={10} id_div="addFriendCard"/>
            </div>
            <div className="h-full sm:w-1/5 w-2/5 flex justify-center items-center" onClick={() => { handleNav("profil", friend.id) }}>
                <h2>{friend.username}</h2>
            </div>
            <div className="w-2/5 flex justify-evenly h-full items-center">
                <button className="w-2/5 text-xs bg-green-500 h-4/5 rounded-xl text-white ease-in-out" onClick={() => { acceptFriend(friend.id, true) }}>Accept</button>
                <button className="w-2/5 text-xs bg-red-500 h-4/5 rounded-xl text-white" onClick={() => { acceptFriend(friend.id, false) }}>Refuse</button>

            </div >
        </div >
    )
}

export default FriendRequestCard