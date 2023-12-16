import "./leftComponent.css"
import { InfoProfilComponent } from "./infoCurrentUser/InfoProfilComponent"
import { GameStats } from "./infoCurrentUserStats/componentInfoGame";
import { MyName } from "./infoCurrentUser/infoProfil/tools/personalInformations";
import { LevelUser } from "./infoCurrentUser/infoLevel/infoLevel";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useAccount } from "../../../ui/organisms/useAccount";
import { FriendStatus } from "../../Friend/interface/friendStatus";
import { useFriends } from "../../Friend/useFriends";
import axios from "axios";
import { addFrind } from "../../Friend/teststatus";
import AvatarContainer from "../../HomePage/CardContent/avatarContainer";

interface Props {
	id: number;
}

interface User {
	username: string;
	id: number;
	avatar: string;
	twoFa: boolean;
	status: number;
}

interface LeftComponentProps {
	user: User | undefined;
}

export const LeftComponent: React.FC<LeftComponentProps> = ({ user }) => {
	const { account } = useAccount();
	const [isFriend, setIsFriend] = useState<string>("");
	const [isUserBlock, setUserBlock] = useState<string>("");

	useEffect(() => {
		if (user?.id && user?.id !== account.id) {
			const fetchFriends = async () => {
				const response = await axios.get(`http://localhost:4000/friends/getFriendParId/${user?.id}`, { withCredentials: true });
				if (response.data) {

					if (response.data?.friend_status === 0)
						setIsFriend("Delete");
					if (response.data?.friend_status !== 0)
						setIsFriend("Pending ...");
				}
				else
					setIsFriend("Add");

			};
			fetchFriends();
			const fetchUserBlocked = async () => {
				const response = await axios.get(`http://localhost:4000/user/getUserBlockedId/${user?.id}`, { withCredentials: true });
				console.log("response block: ", response.data);
				if (response.data) {

					if (response.data)
						setUserBlock("unblock");
				}
				else
					setUserBlock("block");
			};
			fetchUserBlocked();
		}
	}, [user?.id]);

	const handleFriendsRequest = () => {
		if (isFriend === "Add") {
			try {
				addFrind(user?.id);
				setIsFriend("Pending ...");
			} catch {
				console.error("error while sending friends request");
			}
		}
		if (isFriend === "Delete") {
			const removeFriend = async () => {
				const friendObj = {
					id : user?.id,
					accept : true
				}
				try {
					const response = await axios.post("http://localhost:4000/friends/removeFriend", friendObj, {withCredentials:true})
					setIsFriend("Add")
				} catch {
					console.error("error while deleting friends request");
				}
			}
			removeFriend();
		}	
	}
	const handleBlockedRequest = () => {
		if (isUserBlock === "block") {
			const block = async () => {
				console.log("hello");
				try {
					const response = await axios.get(`http://localhost:4000/user/block/${user?.id}`, { withCredentials: true });
					console.log("block: ", response.data);
					setUserBlock("unblock");
				} catch {
					console.error("error while sending friends request");
				}
			}
			block();
		}
		else {
			const deblock = async () => {
				try {
					const response = await axios.get(`http://localhost:4000/user/unblock/${user?.id}`, {withCredentials:true})
					console.log("unblock: ", response.data);
					setUserBlock("block")
				} catch {
					console.error("error while deleting friends request");
				}
			}
			deblock();
		}
	}

	return (
		<div>
			<div className="left-component-main text-xs">
				<div className="info-profile-component gray-border"
					style={{ gridTemplateRows: "2fr 1fr" }}>
					<div className="information-user-component">
						< div className="rounded h-full col-span-1 gray-border">
							<AvatarContainer src={user?.avatar} navigation={false}/>
						</div>
						<div className="text-information-component">
							<MyName id={user?.id} username={user?.username} index={0} />
						</div>
					</div>
					<div className="information-level-component">
						<LevelUser user={user} />
					</div>
				</div>
			</div>
			{user?.id !== account.id &&
				<div className="w-full flex justify-center items-center p-5">
					<Button className="w-32 h-8 rounded p-2 text-white mr-3" onClick={() => { handleFriendsRequest() }} variant="outlined">
						{isFriend}
					</Button>
                    <Button className="w-32 h-8 rounded p-2 text-white" onClick={() => { handleBlockedRequest() }} variant="outlined">
						{isUserBlock}
                    </Button>
				</div>
			}
		</div>
	);
}

