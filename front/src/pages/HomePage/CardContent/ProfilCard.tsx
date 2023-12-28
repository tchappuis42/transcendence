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
import { useAuth } from "../../../ui/organisms/useAuth";

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
    const { authenticate } = useAuth();

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
            catch (error: any) {
                console.error("error while fetching friend request");
                if (error.response.request.status === 401)
                    authenticate();
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
        <div className="h-full w-full grid grid-cols-1 grid-rows-3 p-3 bg-gray-200/60 rounded">
            <div id={"profilCard"} className="row-span-1 grid grid-cols-4 grid-rows-1 w-full pb-3 gap-5 rounded object-cover">
                <AvatarContainer src={account.avatar} id={account.id} navigation={true} id_div={"profilCard"} />
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
                    <div className="m-card">
                        <div className='header-card'>
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
