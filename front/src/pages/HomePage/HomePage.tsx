import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import Pong from "../Game/Pong";
import ProfilCard from "./CardContent/ProfilCard";
import ChatCard from "./CardContent/ChatCard";
import PongCard from "./CardContent/PongCard";

const HomePage = () => {

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
				<PongCard></PongCard>
			</MenuCard>
			<MenuCard>
			</MenuCard>
			
            </div>
        </div>
    );
};

export default HomePage;
