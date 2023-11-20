import * as React from "react"
import "./chatSide.css"
import "../styleProfilPage/mainCSS.css"
import "./chatFriendsInfo/chatFriendsInfo.css"
import {BubbleData} from "../middleComponent/leaderboard";
import {ChatUserHistoric} from "./chatFriendsInfo/chatFriendsInfo";

export const ChatSide = () => {
	let bubbleData = BubbleData();
	return(
		<div className="right-component-main red-border">
			<div className="right-component-table red-border gap-5">
				<div className="info-chat-component blue-border row-span-3">
					<table className="border-separate border-spacing-2 w-full items-start">
						<tbody>
							<div className="bubble-component-chat">
								{
									bubbleData.map((data, index) => (
										<ChatUserHistoric
											key={index}
											index={index + 1}
											stats={data.stats}
											name={data.name}
											user={data.user}
										/>
									))}
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