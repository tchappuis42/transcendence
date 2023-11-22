import * as React from "react"
import "./chatSide.css"
import "../styleProfilPage/mainCSS.css"
import "./chatFriendsInfo/chatFriendsInfo.css"
import {ChatUserHistoric} from "./chatFriendsInfo/chatFriendsInfo";
import {UserStatus} from "../tools/userStatus";

export const ChatSide = () => {

	const { sorted } = UserStatus();

	return(
		<div className="right-component-main red-border">
			<div className="right-component-table red-border gap-5">
				<div className="info-chat-component blue-border row-span-3">
					<table className="border-separate border-spacing-2 w-full items-start">
						<tbody>
							<div className="bubble-component-chat">
								{sorted.map(u =>
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
	);
}