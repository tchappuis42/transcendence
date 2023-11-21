import { Navigate, useNavigate } from "react-router-dom";
import Navigation, { NavigationItem } from "../../../ui/organisms/Navigation";
import { useAccount } from "../../../ui/organisms/useAccount";

const MessageCard = () => {
    const navigate = useNavigate();
    const {account} = useAccount();
    const handleMouseEnter = (event: any) => {
        event.currentTarget.style.transform = "scale(1.1)";
    };

    const handleMouseLeave = (event: any) => {
        event.currentTarget.style.transform = "scale(1)";
    };

    const navigationOptionsChat = [
        {label : "See", url: '/chat' },
    ];

    const handleNav = () => {
        navigate(`/chat`)
    }
    return (
        <div className="messageContainer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleNav}>
            <div className="messagePicContainer">
            <img alt="image de profil" style={{borderRadius:"10%", height:"100%"}}
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
            </div>
            <div className="messageText">
                <h2 style={{fontSize:"100%"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, dolor soluta repellat officiis similique consequatur quam adipisci consectetur eum tempora, error saepe a, sit animi dolore illo distinctio dolorum vitae.</h2>
            </div>
        </div>
    )
}

export default MessageCard