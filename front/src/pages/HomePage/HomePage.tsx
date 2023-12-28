import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import Pong from "../Game/Pong";
import ProfilCard from "./CardContent/ProfilCard";
import ChatCard from "./CardContent/ChatCard";
import PongCard from "./CardContent/PongCard";
import Ranking from "../Game/Ranking";
import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "./Tools";
import AddFriendCard from "./CardContent/AddFriendCard";
import FriendsToAdd from "../Friend/component/AddFriend";
import { useSocket } from "../../ui/organisms/SocketContext";
import "../Chat/chat.css"

const HomePage = () => {

    const navigate = useNavigate();
    const socket = useSocket();

    useEffect(() => {
        if (socket) {
            socket.on("game", (data) => {
                if (typeof data === 'object') {
                    navigate("/pong")
                }
            });
        }
        return () => {
            if (socket) {
                socket.off("game");
            }
        };
    }, [socket]);
    return (
        <div className="lg:main-page sm:px-10 md:px-20 lg:px-30 xl:px-40 2xl:px-80" >
            <div className="main-component">
                <MenuCard>
                    <ProfilCard></ProfilCard>
                </MenuCard>
                <MenuCard>
                    <FriendsToAdd />
                </MenuCard>
                <MenuCard>
                    <ChatCard></ChatCard>
                </MenuCard>
                <MenuCard>
                    <Ranking></Ranking>
                </MenuCard>
            </div>
        </div>
    );
};

export default HomePage;
