import React from "react";

interface MenuCardProps {
    backgroundColor?: string;
    children?: React.ReactNode;
}

const MenuCard: React.FC<MenuCardProps> = ({ backgroundColor, children }) => {

    return (
        <div className="h-full w-full flex items-center justify-center rounded shadow">
            {children}
        </div>
    );
};

export default MenuCard;
