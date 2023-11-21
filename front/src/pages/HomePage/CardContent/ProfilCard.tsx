import React from "react";
import { useAccount } from "../../../ui/organisms/useAccount";
import "./CardStyle.css";

const ProfilCard = () => {
    const { account } = useAccount();

    const handleMouseEnter = (event: any) => {
        event.currentTarget.style.transform = "scale(1.1)";
    };

    const handleMouseLeave = (event: any) => {
        event.currentTarget.style.transform = "scale(1)";
    };

    return (
        <div className="contentHidden">
            <div className="profilHeaderCard">
                <div className="picContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
                <div className="profilInfoCard" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>INOFFOFOF</div>
                <div className="profilInfoCard" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>DES INFOFOOFO</div>

            </div>
        </div>
    );
};

export default ProfilCard;
