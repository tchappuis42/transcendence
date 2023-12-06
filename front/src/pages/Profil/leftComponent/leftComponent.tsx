import "./leftComponent.css"
import {InfoProfilComponent} from "./infoCurrentUser/InfoProfilComponent"
import { GameStats } from "./infoCurrentUserStats/componentInfoGame";
import {MyName} from "./infoCurrentUser/infoProfil/tools/personalInformations";
import {LevelUser} from "./infoCurrentUser/infoLevel/infoLevel";
import React, {useEffect, useState} from "react";
import { Button } from "@material-tailwind/react";
import {useAccount} from "../../../ui/organisms/useAccount";
import {FriendStatus} from "../../Friend/interface/friendStatus";
import {useFriends} from "../../Friend/useFriends";
import axios from "axios";
import { addFrind } from "../../Friend/teststatus";

interface Props {
	id: number;
}

interface User {
	username : string;
	id : number;
	avatar : string;
	twoFa: boolean;
	status : number;
}
  
  interface LeftComponentProps {
	user: User | undefined;
  }

export const LeftComponent: React.FC<LeftComponentProps> = ({user}) => {
	const {account} = useAccount();
	const { getFriends, sortByStatus } = useFriends();
	const [isFriend, setIsFriend] = useState<string>("");

	useEffect(() => {
		console.log("useEffect lets go ")
		if (user?.id && user?.id !== account.id) {
			const fetchFriends = async () => {
				const response = await axios.get(`http://localhost:4000/friends/getFriendParId/${user?.id}`, { withCredentials: true }); 
				if (response.data)
				{

					if (response.data?.friend_status === 0)
						setIsFriend("supprimer");
					if (response.data?.friend_status === 2)
						setIsFriend("pending ...");
				}
				else 
					setIsFriend("ajouter");
				
			};
			fetchFriends();
		}
	}, [user?.id]);

	const handleFriendsRequest = () => {
			if (isFriend==="ajouter") {
				try {
					addFrind(user?.id);
					setIsFriend("en attente");
				} catch {
					console.error("error while sending friends request");
				}
			}
			if (isFriend === "supprimer") {
				try {
					// DeleteFriend(user?.id);
					setIsFriend("ajouter");
				} catch {
					console.error("error while sending friends request");
				}
			}
		}

	return (
		<div>
			<div className="left-component-main text-xs">
				<div className="info-profile-component gray-border"
					 style={{gridTemplateRows: "2fr 1fr"}}>
					<div className="information-user-component">
						<img alt="image de profil" className="rounded h-full col-span-1 gray-border"
							 src={user?.avatar}/>
						<div className="text-information-component">
							<MyName id={user?.id} username={user?.username} index={0}/>
						</div>
					</div>
					<div className="information-level-component">
						<LevelUser user={user}/>
					</div>
				</div>
			</div>
			{ user?.id !== account.id &&
				<div className="w-full flex justify-center items-center p-5">
						<Button className="w-32 h-8 rounded p-2 text-white" onClick={() => {handleFriendsRequest()}} variant="outlined">
							{isFriend}
						</Button>
                </div>
			}
		</div>
	);
}

