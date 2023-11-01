import * as React from "react"
import "./userGameWin.css"
import {useRef, useState} from "react";

export const UserGameWin = () => {
	const [progress, setProgress] = useState(0);

	const handleUserWinUp = (): void => {
		if (progress < 0)
			setProgress(0);
		else if (progress < 1000)
			setProgress(progress + 50);
		else
			setProgress(0);
	}
	const handleUserWinReset = (): void => {
		if (progress > 0) {
			setProgress(0);
		}
	}
	return (
		//Attention changer gridTemplateColumn pour automatisation donnees
		<div className="game-win-component">
			<div className="game-win-result green-border">
				{progress}
			</div>
			<div className="game-win-up-down green-border">
				<button className="game-button-up-down" onClick={handleUserWinUp}>
					up
				</button>
				<button className="game-button-up-down" onClick={handleUserWinReset}>
					reset
				</button>
			</div>
		</div>
	);
}