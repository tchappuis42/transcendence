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
                const response = await axios.get("http://localhost:4000/friends/friends", { withCredentials: true });
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
        <div className="h-full w-full">
            <div className="h-1/3 flex justify-around items-center mx-2 mt-1">
                <AvatarContainer src={account.avatar} id={account.id} navigation={true}/>
                <div className="h-full w-4/5">
                    <h1 className="h-full w-full items-center justify-center flex text-white text-3xl">
                        {account.username}
                    </h1>
                </div>
            </div>
            <div className="h-2/3 w-full flex pt-px">
                <div className="w-1/2 p-2 rounded-xl">
                    <Friends />
                </div>
                <div className="w-1/2  p-2 rounded-xl" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => { handleNav("pong", account.id) }}>
                    <div className="bg-black/50 h-full w-full rounded-md shadow-md shadow-white">
                        <div className='h-[10%] flex justify-center items-center rounded-md shadow-lg bg-white/90'>
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
