import * as React from "react"
import "../../css/index.css"
import "./styleProfilPage/mainCSS.css"
import "./styleProfilPage/toolsCss.css"
import { useLocation } from "react-router-dom"
// import {LeftComponent} from "./leftComponent/leftComponent"
// import {Leaderboard} from "./middleComponent/leaderboard"
// import {ChatSide} from "./rightComponent/chatSide"

/*friends.controller.ts, friends.service.ts*/
export const Profil = () => {
	const location = useLocation();
	const id = location.state ? location.state.id : null;

	return (
		<>
			<div className="mainBox gap-4">
				<div className="mainTable flex justify-center items-center font-bold"
					 style={{fontFamily: "helvetica"}}>Profil-page avec id : {id}</div>
				{/*<div className="mainTable grid-cols-1 md:grid-cols-2 lg:grid-cols-3 blue-border">*/}
					{/*<LeftComponent/>*/}
					{/*<Leaderboard/>*/}
					{/*<ChatSide/>*/}
				{/*</div>*/}
			</div>
		</>
	);
}