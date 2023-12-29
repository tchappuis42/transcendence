import React, { useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import FriendRequestCard from "./FriendRequestCard";
import axios from "axios";


interface friend {
    id: number;
    username: string;
    status: number;
    friend_status: number;
}


const AddFriendCard = () => {

    const [friendsToAdd, setFriendsToAdd] = useState<friend[]>()


    useEffect(() => {
        const getFriendRequest = async () => {
            try {

                const response = await axios.get("/api/friends/friends", { withCredentials: true });
                const filteredFriends = sortByStatus(response.data);
                setFriendsToAdd(filteredFriends);
            }
            catch {
                console.error("error while fetching friend request");
            }

        }
        getFriendRequest();
    }, [])

    const sortByStatus = (friends: friend[]): friend[] => {

        const filteredFriends = friends.filter(friend => friend.friend_status === 1);

        return filteredFriends;
    };

    return (
        <div className="contentHidden">
            <div className="MessageTitleContainer">
                <div className="MessageTitleLogo">
                    Logo
                </div>
                <div className="MessageTitleTextContainer" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <h2 className="MessageTitleText">Friend Request</h2>
                </div>
                <div className="MessageTitleNbr">
                    <h1 className="MessageTitleText">{friendsToAdd?.length}</h1>
                </div>
            </div>
            <div className="MessageCardContainer">
                {friendsToAdd?.length ?
                    friendsToAdd.map((friend: friend) => (
                        <FriendRequestCard key={friend.id} friend={friend} />
                    ))
                    :
                    <div className="noFriendRequestContainer">
                        <h1 className="noFriendRequestText">No new friend request</h1>
                    </div>
                }
            </div>

        </div>
    )
}

export default AddFriendCard