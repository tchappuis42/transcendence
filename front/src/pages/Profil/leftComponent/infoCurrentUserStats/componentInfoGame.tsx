import React from "react";
import "./componentInfoGame.css"
import {UserGameWin} from "./infoProfil/userGameWin";

const Bubble = () => {
	return (
		<div className="user-stat-elements blue-border">
			<div className="user-stat-elements-info red-border">
				<div className="name-stats green-border">
					name
				</div>
				<div className="level-stats red-border">
					<UserGameWin/>
				</div>
			</div>
		</div>
	);
}
export const GameStats = () =>  {
	return (
		<div className="main-bubble-component blue-border">
			<Bubble/>
			<Bubble/>
			<Bubble/>
			<Bubble/>
			<Bubble/>
			<Bubble/>
		</div>
	);
}
