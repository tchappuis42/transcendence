import React, { useEffect, useState } from "react";
import { useAccount } from "../../../ui/organisms/useAccount";
import "./CardStyle.css";
import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../Tools";
import axios from "axios";
import FriendCard from "./FriendCard";
import Ranking from "../../Game/gameRanking";
import RankingCard from "./RankingCard";

interface Friend {
    id : number;
    username : string;
    status : number;
    friend_status : number;
}

const ProfilCard = () => {

    const { account } = useAccount();
    const navigate = useNavigate();
    const [friends, setFriends] = useState<Friend[]>();

    const sortByStatus = (friends: Friend[]): Friend[] => {
        const sortedFriends = friends.sort((a, b) => b.status - a.status);
        const filteredFriends = sortedFriends.filter(friend => friend.friend_status === 0);
        return filteredFriends;
    };

    useEffect(() => {
        const getFriendRequest = async () => {
            try {
                const response = await axios.get("http://localhost:4000/friends/friends", { withCredentials: true });
                console.log("response :", response.data);
                const sortedFriends = sortByStatus(response.data);
                console.log("data", response.data);
                console.log("sorted", sortedFriends);
                setFriends(sortedFriends);
            }
            catch {
                console.error("error while fetching friend request");
            }
            
        }
        getFriendRequest();
    }, [])

    const handleNav = (toNav : string, id : number) => {
        navigate(toNav, {
            state : {
                id : id
            }
        })
    }

    return (
        <div className="contentHidden">
            <div className="profilHeaderCard">
                <div className="picContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={ () => {handleNav("profil", account.id)}}>
                <img alt="image de profil" style={{borderRadius:"10%"}}
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
                </div>
                <div className="profilNameCard">
                    <h1 className="userNameCard">
                        {account.username}
                    </h1>
                </div>

            </div>
            <div className="profilInfoContainer">
                <div className="profilInfoCard">
                    <div className="ProfilInfoFriendTitle">
                        <h1>Friends ({friends?.length})</h1>
                    </div>
                    {!friends ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
                            <h1>No friends</h1>
                        </div>
                    ) : (
                        
                        <div className="MessageCardContainer">
                            {sortByStatus(friends)?.map((friend: Friend) => (
                                <FriendCard key={friend.id} friend={friend} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="profilInfoCard" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {handleNav("pong", account.id)}}>
                    <div className="ProfilInfoFriendTitle">
                        <h1>Ranking</h1>
                    </div>
                    <RankingCard></RankingCard>
                </div>

            </div>
        </div>
    );
};

export default ProfilCard;
