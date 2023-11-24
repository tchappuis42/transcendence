import React from "react";

interface MenuCardProps {
    backgroundColor?: string;
    children?: React.ReactNode;
}

const MenuCard: React.FC<MenuCardProps> = ({ backgroundColor, children }) => {
    const containerStyle: React.CSSProperties = {
        backgroundColor: backgroundColor || "rgba(0,0,0,0.5)",
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

    return (
        <div style={containerStyle}>
                {children}
        </div>
    );
};

export default MenuCard;
