import React, { useEffect, useState } from "react";
import { useAccount } from "../../../ui/organisms/useAccount";
import "./CardStyle.css";
import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../Tools";
import axios from "axios";
import FriendCard from "./FriendCard";
import Ranking from "../../Game/Ranking";
import RankingCard from "./RankingCard";
import Friends from "../../Friend/component/Friends";
import AvatarContainer from "./avatarContainer";

interface Friend {
    id: number;
    username: string;
    status: number;
    friend_status: number;
}

const ProfilCard = () => {

    const { account } = useAccount();
    const navigate = useNavigate();
    const [friends, setFriends] = useState<Friend[]>();

    const sortByStatus = (friends: Friend[]): Friend[] => {
        const sortedFriends = friends.sort((a, b) => a.status - b.status);
        const filteredFriends = sortedFriends.filter(friend => friend.friend_status === 0);
        return filteredFriends;
    };

    useEffect(() => {
        const getFriendRequest = async () => {
            try {
                const response = await axios.get("/api/friends/friends", { withCredentials: true });
                const sortedFriends = sortByStatus(response.data);
                setFriends(sortedFriends);
            }
            catch {
                console.error("error while fetching friend request");
            }

        }
        getFriendRequest();
    }, [])

    const handleNav = (toNav: string, id: number) => {
        navigate(toNav, {
            state: {
                id: id
            }
        })
    }

    return (
        <div className="h-full w-full grid grid-cols-1 grid-rows-3 m-5">
            <div id={"profilCard"} className="row-span-1 grid grid-cols-4 grid-rows-1 w-full py-3 rounded object-cover">
                <AvatarContainer src={account.avatar} id={account.id} navigation={true} id_div={"profilCard"}/>
                <div className="col-span-3 h-full w-full">
                    <h1 className="h-full w-full items-center justify-center flex text-white text-2xl border rounded">
                        {account.username}
                    </h1>
                </div>
            </div>
            <div className="row-span-2 grid grid-cols-2 grid-rows-1 w-full pb-5 gap-4">
                <div className="w-full rounded-t-md">
                    <Friends />
                </div>
                <div className="w-full" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => { handleNav("pong", account.id) }}>
                    <div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white">
                        <div className='h-[15%] flex justify-center items-center rounded-t-md shadow-lg bg-white/90'>
                            <h1>Ranking</h1>
                        </div>
                        <RankingCard></RankingCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilCard;
