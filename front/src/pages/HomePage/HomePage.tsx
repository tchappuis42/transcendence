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
    // w-full h-[1500px] lg:h-[850px] py-10 px-2 xl:px-20
    // grid grid-cols-1 lg:min-h-[800px] grid-rows-4 gap-4 lg:grid-cols-2 lg:grid-rows-2 w-full h-full p-2.5 min-w-[430px]
    return (
<<<<<<< HEAD
        <div className="w-full h-screen pb-[100px] overflow-auto py-10 px-5 sm:px-10 md:px-20 lg:px-30 xl:px-40 2xl:px-80" >
=======
        <div className="w-full h-screen pb-[100px] overflow-auto bg-green-200 py-10 px-5 sm:px-10 md:px-20 lg:px-30 xl:px-40 2xl:px-80" >
>>>>>>> 05b7554... modifier css
            <div className="w-full h-full grid grid-cols-1 grid-rows-4 gap-4 min-h-[800px] min-w-[430px] lg:grid-cols-2 lg:grid-rows-2 p-2.5">
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
