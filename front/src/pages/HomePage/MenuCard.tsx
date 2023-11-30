import React from "react";

interface MenuCardProps {
    backgroundColor?: string;
    children?: React.ReactNode;
}

const MenuCard: React.FC<MenuCardProps> = ({ backgroundColor, children }) => {
    const containerStyle: React.CSSProperties = {
        backgroundColor: backgroundColor || "rgba(0,0,0,0.5)",
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.4)",
        boxSizing: "border-box",
        padding: "10px"
    };

    return (
        <div style={containerStyle}>
            {children}
        </div>
    );
};

export default MenuCard;
