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
import addFriend from "../../Friend/AddFriend";
import {addFrind} from "../../Friend/status";
import {DeleteFriend} from "../../Friend/friendss";

interface Props {
	id: number;
}

interface User {
	id: number;
	username: string;
  }
  
  interface LeftComponentProps {
	user: User | undefined;
  }

export const LeftComponent: React.FC<LeftComponentProps> = ({user}) => {
	const {account} = useAccount();
	const { getFriends, sortByStatus } = useFriends();
	const [isFriend, setIsFriend] = useState<string>("");

	useEffect(() => {
		if (user?.id !== account.id) {
			const fetchFriends = async () => {
				const friendsData = await getFriends(FriendStatus.friend);
				const userObject = friendsData?.find((friend) => friend?.id === user?.id);

				console.log("friend: ",userObject);

				if (userObject?.friend_status === 0)
					setIsFriend("supprimer");
				else if (userObject?.friend_status === 1)
					setIsFriend("pending ...");
				else
					setIsFriend("ajouter");

			};
			fetchFriends();
		}
	}, [user]);

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
					DeleteFriend(user?.id);
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
							 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
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

