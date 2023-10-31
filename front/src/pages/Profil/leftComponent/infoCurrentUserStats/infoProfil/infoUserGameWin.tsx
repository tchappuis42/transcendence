import * as React from "react"
import {useRef, useState} from "react";

export const InfoUserGameWin = () => {
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
	// <div className="grid grid-rows-5 h-full w-full border border-solid border-green-800 rounded">
	return (
		//Attention changer gridTemplateColumn pour automatisation donnees
		<div className="grid grid-cols-3 rounded py-2 gap-2 items-center justify-center"
			 style={{height: "50px", border: "solid 1px red", gridTemplateColumns: "2fr 1fr 2fr"}}>
			<div className="flex justify-start items-center rounded px-2 h-full font-extrabold"
				 style={{border: "solid 1px blue", backgroundColor: "lightgray"}}>
				win in game
			</div>
			<div className="flex flex-row justify-start items-center rounded px-2 h-full font-extrabold"
				style={{border: "solid 1px green", backgroundColor: "lightgray"}}>
				{progress}
			</div>
			<div className="grid grid-cols-2 justify-start items-center rounded h-full"
				 style={{border: "solid 1px green", fontSize: "10px", gridTemplateColumns: "1fr, 1fr"}}>
				<button className="py-2 px-1 rounded" onClick={handleUserWinUp}
						style={{border: "solid 1px purple", backgroundColor: "lightgray"}}>
					win-up
				</button>
				<button className="py-2 px-1 rounded" onClick={handleUserWinReset}
						style={{border: "solid 1px green", backgroundColor: "lightgray"}}>
					win-Reset
				</button>
			</div>
		</div>
	);
}