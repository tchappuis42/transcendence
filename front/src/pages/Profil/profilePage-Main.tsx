import * as React from "react"
import "../index.css"
import "./styleProfilPage/mainCSS.css"
import "./styleProfilPage/toolsCss.css"
import {LeftComponent} from "./leftComponent/leftComponent"
import {Leaderboard} from "./middleComponent/leaderboard"
import {ChatSide} from "./rightComponent/chatSide"
import {TopBar} from "./topBar/topBar";

export const UserProfilPage = () => {
	return (
			<>
				<div className="mainBox gap-4">
					<TopBar/>
					<div className="mainTable grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
						<LeftComponent/>
						<Leaderboard/>
						<ChatSide/>
					</div>
				</div>
			</>
	);
}
