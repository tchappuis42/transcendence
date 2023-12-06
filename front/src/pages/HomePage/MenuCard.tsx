import React from "react";

interface MenuCardProps {
    backgroundColor?: string;
    children?: React.ReactNode;
}

const MenuCard: React.FC<MenuCardProps> = ({ backgroundColor, children }) => {

    return (
        <div className="bg-black/60 h-full w-full flex items-center justify-center rounded shadow-md shadow-white">
            {children}
        </div>
    );
};

export default MenuCard;
