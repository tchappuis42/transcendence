import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../Tools";

interface Friend {
    id: number;
    username: string;
    status: number;
    friend_status: number;
}

// Utilisation de l'interface dans la fonction FriendCard
const FriendCard: React.FC<{ friend: Friend }> = ({ friend }) => {

    const navigate = useNavigate();

    const getStatusColor = (status : number)  => {
        switch (status) {
            case 0:
                return "yellow";
            case 1:
                return "rgba(23, 186, 5, 0.7)";
            case 2:
                return "rgba(186, 32, 5, 0.7)";
            default:
                return "transparent";
        }
    }

    const handleNav = (id : number) => {
        navigate("/profil", {
            state : {
                id : id
            }
        })
    }

    return (
        <div className="messageContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => handleNav(friend.id)}>
            <div className="friendPicContainer">
            <img alt="image de profil" style={{borderRadius:"10%", height:"100%"}}
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
            </div>
            <div className="friendName" >
                <h2 style={{ fontSize: "100%" }}>{friend.username}</h2>
            </div>

            <div style={{height:"60%", width: "10%", borderRadius: "100%", background: getStatusColor(friend.status), marginRight: 20}}>
            </div>
        </div>
    );
};

export default FriendCard;
