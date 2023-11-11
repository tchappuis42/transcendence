import * as React from "react"
import "../../css/index.css"
import "./styleProfilPage/mainCSS.css"
import "./styleProfilPage/toolsCss.css"
import {LeftComponent} from "./leftComponent/leftComponent"
import {Leaderboard} from "./middleComponent/leaderboard"
import {ChatSide} from "./rightComponent/chatSide"
import {TopBar} from "./topBar/topBar";

/*friends.controller.ts, friends.service.ts*/
export const Profil = () => {
	return (
		<>
			<div className="mainBox gap-4">
				<div className="mainTable flex justify-center items-center font-bold"
					 style={{fontFamily: "helvetica"}}>Profil-page</div>
				{/*<div className="mainTable grid-cols-1 md:grid-cols-2 lg:grid-cols-3 blue-border">*/}
					{/*<LeftComponent/>*/}
					{/*<Leaderboard/>*/}
					{/*<ChatSide/>*/}
				{/*</div>*/}
			</div>
		</>
	);
}