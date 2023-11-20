interface MenuCardProps {
    backgroundColor?: string;
    onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
    onMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
    children: React.ReactNode;
}

const MenuCard: React.FC<MenuCardProps> = ({ backgroundColor, onMouseEnter, onMouseLeave, children }) => {
    const rectangleStyle = {
        backgroundColor: backgroundColor || "transparent",
        margin: 10,
        height: "100%",
        width: "50%",
        transition: "transform 0.3s ease-in-out",
    };

    return (
        <div style={{height:"100%"}}>
            <div style={{height:10}}></div>
            <div style={{ background: "purple", height: "50%", width: "100%", display: "flex" }}>
                <div style={{ ...rectangleStyle }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                    {children}
                </div>
                <div style={{ ...rectangleStyle, backgroundColor: "white" }} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}></div>
            </div>
        </div>
    );
};

export default MenuCard