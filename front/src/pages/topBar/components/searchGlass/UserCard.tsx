import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../../../HomePage/Tools";
import "./dropDownStyle.css"

interface User {
	id : number;
	username : string;
}

interface UserCardProps {
    user: User;
    setOpen: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const UserCard = ({ user, setOpen }: UserCardProps) => {

    const navigate = useNavigate();
        
    const handleNav = (toNav : string, id : number) => {
        console.log("navi")
        navigate("/profil", {
            state : {
                id : id
            }
        })
        setOpen("");
    }
        

    return(
        <div className="messageContainer"  style={{background: "rgba(0,0,0,0.8)", borderWidth:1, boxShadow:"0 4px 8px rgba(255, 255, 255, 0.6)"}} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => {handleNav("profil", user.id)}}>
            <div className="messagePicContainer">
            <img alt="image de profil" style={{borderRadius:"10%", height:"100%"}}
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
            </div>
            <div className="messageText">
                <h2 style={{fontSize:"100%", color:"white"}}>{user.username}</h2>
            </div>
        </div>
    )

}

export default UserCard