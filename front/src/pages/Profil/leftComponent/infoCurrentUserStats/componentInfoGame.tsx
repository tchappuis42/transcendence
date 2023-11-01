import React from "react";
import "./componentInfoGame.css"
import {UserGameWin} from "./infoProfil/userGameWin";

export const GameStats = () =>  {
	return (
		<div className="user-stat-elements red-border">
			<div className="user-stat-elements-info">
				<div className="name-stats green-border">
					name
				</div>
				<div className="level-stats">
					<UserGameWin/>
				</div>
			</div>
		</div>
	);
}
