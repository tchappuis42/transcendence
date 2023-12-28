import { useNavigate } from "react-router-dom";
import { handleMouseEnter, handleMouseLeave } from "../../../HomePage/Tools";
import "./dropDownStyle.css"
import AvatarContainer from "../../../HomePage/CardContent/avatarContainer";

interface User {
    id: number;
    username: string;
    avatar: string
}

interface UserCardProps {
    user: User;
    setOpen: React.Dispatch<React.SetStateAction<string>>;
}

const UserCard = ({ user, setOpen }: UserCardProps) => {

    const navigate = useNavigate();

    const handleNav = (toNav: string, id: number) => {
        navigate("/profil", {
            state: {
                id: id
            }
        })
        setOpen("");
    }


    return (
        <div id={"userCard"} className="messageContainer" style={{ background: "rgba(0,0,0,0.8)", borderWidth: 1, boxShadow: "0 4px 8px rgba(255, 255, 255, 0.6)" }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={() => { handleNav("profil", user.id) }}>
            <AvatarContainer src={user.avatar} navigation={true} id={user.id} square={5} id_div="userCard" />
            <div className="messageText">
                {user.username.length <= 13 ? (
                    <h2 className="text-white flex justify-center items-center">{user.username}</h2>
                ) : (
                    <h2 className="text-white flex justify-center items-center">{user.username.slice(0, 13)}.</h2>

                )}
            </div>
        </div>
    )

}

export default UserCard