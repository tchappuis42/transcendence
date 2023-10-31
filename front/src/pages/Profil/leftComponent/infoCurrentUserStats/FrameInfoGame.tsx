import React from "react";
import "./frameInfoGame.css"
import {InfoUserGameWin} from "./infoProfil/infoUserGameWin";
// <div className="grid grid-rows-5 h-full w-full border border-solid border-green-800 rounded">
// 	<div className="grid grid-cols-3 border border-solid w-full">
//
// 	</div>
// </div>
// <div className="flex flex-row justify-center items-center border border-solid h-full">
// 	hello
// </div>
// <div className="justify-center items-center border border-solid h-full">
// 	hello
// </div>
// <div className="justify-center items-center border border-solid h-full">
// 	hello
// </div>
export const FrameInfoGame = (): JSX.Element => {
	return (
		<div className="game-stats-component red-border">
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
			<InfoUserGameWin/>
		</div>
	);
};



