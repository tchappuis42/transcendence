import React from "react";

interface MenuCardProps {
    backgroundColor?: string;
    children?: React.ReactNode;
}

const MenuCard: React.FC<MenuCardProps> = ({ backgroundColor, children }) => {
    const containerStyle: React.CSSProperties = {
        backgroundColor: backgroundColor || "rgba(0,0,0,0.3)",
        margin: 10,
        height: "80%",
        width: "calc(50% - 20px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        boxSizing: "border-box",
    };

    const contentStyle = {
        backgroundColor: "rgba(255,255,255,0.9)",
        height: "90%", 
        width: "90%", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "transform 0.3s ease-in-out",
        borderRadius: 5,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        boxSizing: "border-box" as const,
    };

    const handleMouseEnter = (event : any) => {
        event.target.style.transform = "scale(1.1)";
    };

    const handleMouseLeave = (event : any) => {
        event.target.style.transform = "scale(1)";
    };

    return (
        <div style={containerStyle}>
            <div style={contentStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
            </div>
        </div>
    );
};

export default MenuCard;
