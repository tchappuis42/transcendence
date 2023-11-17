import * as React from "react"
import "../styleProfilPage/mainCSS.css"
import "./chatSide.css"
import "./chatFriendsInfo/chatFriendsInfo.css"

import { Badge, Button } from "@material-tailwind/react";
import {BubbleData} from "../middleComponent/leaderboard";
import {ChatUserHistoric, ChatUserOnline} from "./chatFriendsInfo/chatFriendsInfo";
import {BubbleBodyLeaderboard, BubbleHeadLeaderboard} from "../middleComponent/leaderboardInfo/leaderboardComponent";

export const ChatSide = () => {

	let bubbleData = BubbleData();

	return(
		<div className="right-component-main red-border">
			<div className="right-component-table red-border gap-5">
				<div className="info-chat-component blue-border row-span-3">
					<table className="border-separate border-spacing-2 w-full items-start">
						<tbody>
						<div className="bubble-component">
							{
								bubbleData.map((data, index) => (
									<ChatUserHistoric
										key={index}
										index={index + 1}
										stats={data.stats}
										name={data.name}
										user={data.user}
										className={data.user === "ieie" ? "sticky top-0 bg-blue-200" : undefined}
									/>
								))}
						</div>
						</tbody>
					</table>
					{/*<div className="chat-component-main red-border">*/}
				{/*		<div className="chat-component-elements-table pr-3 blue-border">*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*			<ChatUserHistoric/>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				</div>
				<div className="online-users-component blue-border">
					{/*<div className="online-component-main red-border">*/}
				{/*		<div className="online-component-elements-table pr-3 blue-border">*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				</div>
				<div className="online-users-component blue-border">
					{/*<div className="ongame-component-main red-border">*/}
				{/*		<div className="ongame-component-elements-table pr-3 blue-border">*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*			<ChatUserOnline/>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				</div>
			</div>
		</div>
	);
}