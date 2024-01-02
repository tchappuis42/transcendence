import { Navigate, useNavigate } from "react-router-dom";
import { useAccount } from "../../../ui/organisms/useAccount";
import { handleMouseEnter, handleMouseLeave } from "../Tools";

const MessageCard = () => {
    const navigate = useNavigate();
    const {account} = useAccount();


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
                <h2 style={{fontSize:"100%"}}>Jambon ipsum dolor sit amet consectetur adipisicing elit. Et, dolor soluta repellat officiis similique consequatur quam adipisci consectetur eum tempora, error saepe a, sit animi dolore illo distinctio dolorum vitae.</h2>
            </div>
        </div>
    )
}

export default MessageCard
