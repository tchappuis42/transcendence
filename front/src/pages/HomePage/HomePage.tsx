import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import Pong from "../Game/Pong";
import ProfilCard from "./CardContent/ProfilCard";
import ChatCard from "./CardContent/ChatCard";
import PongCard from "./CardContent/PongCard";
import Ranking from "../Game/gameRanking";
import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "./Tools";
import AddFriendCard from "./CardContent/AddFriendCard";

const HomePage = () => {

    const navigate = useNavigate();

    const handleNav = () => {
        navigate("/pong")
    }

    return (
        <div  style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginBottom:30}}>
            <div style={{ height: "80%", width: "90%", display: "flex", flexWrap: "wrap" }}>
			<MenuCard>
                <div className="rankingContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={(handleNav)}>
                    <Ranking></Ranking>
                </div>
			</MenuCard>
			<MenuCard>
				<ProfilCard></ProfilCard>
			</MenuCard>
            <MenuCard>
				<ChatCard></ChatCard>
            </MenuCard>
            <MenuCard>
                    <AddFriendCard></AddFriendCard>
            </MenuCard>
			
            </div>
        </div>
    );
};

export default HomePage;
