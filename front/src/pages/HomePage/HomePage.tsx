import axios from "axios";
import { useAccount } from "../../ui/organisms/useAccount";
import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";

const HomePage = () => {
    const { account } = useAccount();
    const [qrcode, setqr] = useState("");

    const rectangleStyle = {
        backgroundColor: "transparent",
        margin: 10,
        height: "100%",
        width: "50%",
        transition: "transform 0.3s ease-in-out",
    };

    const handleMouseEnter = (event : any) => {
        event.target.style.transform = "scale(1.1)";
    };

    const handleMouseLeave = (event : any) => {
        event.target.style.transform = "scale(1)";
    };

    return (
        <div className="signup" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ background: "red", height: "80%", width: "80%" }}>
                <MenuCard backgroundColor="orange" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
					<div style={{height: "100%", background:"black"}}>jamob</div>
					<div style={{height: "100%", background:"black"}}>jamob</div>

				</MenuCard>
				<div style={{height:10}}></div>
                <div style={{ background: "green", height: "50%", width: "100%", display: "flex" }}>
                    <div style={{ ...rectangleStyle, backgroundColor: "blue" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></div>
                    <div style={{ ...rectangleStyle, backgroundColor: "white" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></div>
                </div>
				<div style={{height:10}}></div>
                <div style={{ background: "green", height: "50%", width: "100%", display: "flex" }}>
                    <div style={{ ...rectangleStyle, backgroundColor: "blue" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></div>
                    <div style={{ ...rectangleStyle, backgroundColor: "white" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
