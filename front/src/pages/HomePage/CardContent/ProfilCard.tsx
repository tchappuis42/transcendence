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
    id: number;
    username: string;
    status: number;
    friend_status: number;
}

const ProfilCard = () => {

    const { account } = useAccount();
    const navigate = useNavigate();
    const [friends, setFriends] = useState<[Friend]>();

const friendsTab = [

    {
        id: 34,
        username: "Paul",
        status: 2,
        friend_status: 3
    },
    {
        id: 24,
        username: "Hubert",
        status: 1,
        friend_status: 1
    }, 
    {
        id: 56,
        username: "Claude",
        status: 2,
        friend_status: 1
    },
    {
        id: 34,
        username: "Paul",
        status: 2,
        friend_status: 3
    },
    {
        id: 24,
        username: "Hubert",
        status: 1,
        friend_status: 1
    }, 
    {
        id: 56,
        username: "Claude",
        status: 0,
        friend_status: 2
    },

]

const sortByStatus = (friends: any[]) => {
    friends.sort((a, b) => b.status - a.status);
    return friends;
};

    const handleNav = (toNav : string, id : number) => {
        navigate(toNav, {
            state : {
                id : id
            }
        })
    }

    useEffect(() => {
        const getFriends = async ()=> {
			try {
				const response = await axios.get("http://localhost:4000/friends/friends", { withCredentials: true });
                response.data = sortByStatus(response.data);
                setFriends(response.data);
			} 
            catch (error) {
				console.error("Erreur lors de la récupération des amis :", error);
			}}
        getFriends();
	}, []);

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
                    {!friendsTab ? (
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "70%" }}>
                            <h1>No friends</h1>
                        </div>
                    ) : (
                        
                        <div className="MessageCardContainer">
                            {sortByStatus(friendsTab)?.map((friend: Friend) => (
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
