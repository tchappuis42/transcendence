import "./leftComponent.css"
import { MyName } from "./infoCurrentUser/infoProfil/personalInformations";
import { LevelUser } from "./infoCurrentUser/infoLevel/infoLevel";
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { useAccount } from "../../../ui/organisms/useAccount";
import axios from "axios";
import { addFrind } from "../../Friend/status";
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
				const response = await axios.get(`/api/friends/getFriendParId/${user?.id}`, { withCredentials: true });
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
				const response = await axios.get(`/api/user/getUserBlockedId/${user?.id}`, { withCredentials: true });
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
					id: user?.id,
					accept: true
				}
				try {
					const response = await axios.post("/api/friends/removeFriend", friendObj, { withCredentials: true })
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
				try {
					const response = await axios.get(`/api/user/block/${user?.id}`, { withCredentials: true });
					setUserBlock("unblock");
				} catch {
					console.error("error while blocking user request");
				}
			}
			block();
		}
		else {
			const deblock = async () => {
				try {
					const response = await axios.get(`/api/user/unblock/${user?.id}`, { withCredentials: true })
					setUserBlock("block")
				} catch {
					console.error("error while unblocking friends request");
				}
			}
			deblock();
		}
	}

	return (
		<>
			{user?.id === account.id ? (
				<div className="m-card p-5">
					<div className="h-full border- max-h-[300px]" style={{ display: "grid", gridTemplateRows: "3fr 1fr" }}>
						<div className="grid grid-cols-3 md:max-h-[250px]">
							<div id={"profil"} style={{ objectFit: "cover", overflow: "hidden" }}>
								<AvatarContainer src={user?.avatar} navigation={false} id_div={"profil"} />
							</div>
							<div className="col-span-2">
								<MyName id={user?.id} username={user?.username} index={0} />
							</div>
						</div>
						<div className="max-h-[80px] min-h-[80px]">
							<LevelUser user={user} />
						</div>
					</div>
				</div>
			) : (
				<div className="m-card grid grid-rows-3 p-5">
					<div className="row-span-2">
						<div className="h-full max-h-[300px]" style={{ display: "grid", gridTemplateRows: "3fr 1fr" }}>
							<div className="grid grid-cols-3 md:max-h-[250px]">
								<div id={"profil"} style={{ objectFit: "cover", overflow: "hidden" }}>
									<AvatarContainer src={user?.avatar} navigation={false} id_div={"profil"} />
								</div>
								<div className="col-span-2">
									<MyName id={user?.id} username={user?.username} index={0} />
								</div>
							</div>
							<div className="max-h-[80px]">
								<LevelUser user={user} />
							</div>
						</div>
						<div className="w-full p-5 row-span-1 flex justify-center items-start">
							<Button className="w-32 h-8 rounded p-2 text-black/60 mr-3" onClick={() => { handleFriendsRequest() }} variant="outlined">
								{isFriend}
							</Button>
							<Button className="w-32 h-8 rounded p-2 text-black/60" onClick={() => { handleBlockedRequest() }} variant="outlined">
								{isUserBlock}
							</Button>
						</div>
					</div>
				</div>
			)
			}

		</>
	);
}

