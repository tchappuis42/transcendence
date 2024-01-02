import React, { useEffect } from "react";
import "./chatSide.css"
import "../styleProfilPage/mainCSS.css"
import "./chatFriendsInfo/chatFriendsInfo.css"
import { UserStatus } from "../tools/userStatus";
import axios from "axios";

interface Users {
	username: string;
	id: number;
	status: number;
}

export const ChatSide = () => {
	/*
		const [users, setUsers] = React.useState<Users[] | undefined>()
	
		useEffect(() => {
			const getUsers = async () => {
				const response = await axios.get("/api/user/users", { withCredentials: true })
				setUsers(response.data)
			}
			getUsers()
		}, [])
	
		return (
			<div className="right-component-main">
				<div className="right-component-table gap-5">
					<div className="info-chat-component row-span-3">
						<table className="border-separate border-spacing-2 w-full items-start">
							<tbody>
								<div className="bubble-component-chat">
									{users?.map(u =>
										<ChatUserHistoric
											key={u.id}
											index={u.id + 1}
											user={u.username}
											status={u.status}
											id={u.id}
										/>
	
									)}
								</div>
							</tbody>
						</table>
					</div>
					<div className="online-users-component blue-border">
					</div>
					<div className="online-users-component blue-border">
					</div>
				</div>
			</div>
		);*/
	return (<></>);
}