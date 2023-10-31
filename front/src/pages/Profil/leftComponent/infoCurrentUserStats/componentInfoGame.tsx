import React from "react";
import "./infoProfil/userGameWin.css"
import "../../styleProfilPage/toolsCss.css"
import {UserGameWin} from "./infoProfil/userGameWin";

export const GameStats = () =>  {
	return (
		<div className="user-stat-elements red-border">
			<div className="user-stat-elements-info">
				<div className="name-stats green-border">
					name
				</div>
				<div className="level-stats">
					{/*level*/}
					<UserGameWin/>
				</div>
			</div>
		</div>
	);
}
// export const FrameInfoGame = (): JSX.Element => {
// 	return (
// 		<div className="game-stats-component red-border">
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 			<InfoUserGameWin/>
// 		</div>
// 	);
// };



