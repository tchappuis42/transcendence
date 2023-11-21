import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import Pong from "../Game/Pong";
import ProfilCard from "./CardContent/ProfilCard";
import ChatCard from "./CardContent/ChatCard";
import PongCard from "./CardContent/PongCard";
import Ranking from "../Game/gameRanking";
import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "./Tools";

const HomePage = () => {

    const navigate = useNavigate();

    const handleNav = () => {
        navigate("/pong")
    }

    return (
        <div className="signup" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", marginBottom:30}}>
            <div style={{ height: "80%", width: "90%", display: "flex", flexWrap: "wrap" }}>
			<MenuCard>
				<ProfilCard></ProfilCard>
			</MenuCard>
			<MenuCard>
				<ChatCard></ChatCard>
			</MenuCard>
            <MenuCard>
                <div style={{transition: "transform 0.3s ease-in-out"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={(handleNav)}>
                    <Ranking></Ranking>
                </div>
            </MenuCard>
			
            </div>
        </div>
    );
};

export default HomePage;
