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
		<div className="game-win-component red-border">
			<div className="game-win-title blue-border">
				win
			</div>
			<div className="game-win-result green-border">
				{progress}
			</div>
			<div className="game-win-up-down green-border">
				<button className="py-2 px-1 rounded blue-border bg-sky-200 col-span-1" onClick={handleUserWinUp}>
					win-u
				</button>
				<button className="py-2 px-1 rounded blue-border bg-sky-200 col-span-1" onClick={handleUserWinReset}>
					win-d
				</button>
			</div>
		</div>
	);
}