import React, {useRef, useState} from "react";
import "./infoLevel.css"
import {LevelBar} from "./tools/levelBar";
import {Flex} from "../../../tools/flex";
import {Grid} from "../../../tools/grid";

export const LevelUser = (): JSX.Element => {
	const [progress, setProgress] = useState(0);
	const handleClick = (): void => {
		if (progress < 100)
			setProgress(progress + 20);
	};
	const handleReset = (): void => {
		setProgress(0);
	}
	return (
		<div className="level-user-component">
			<LevelBar progress={ progress }/>
			<div className="level-current-component">
				level 1000
			</div>
			<div className="level-buttons-component">
				<button onClick={handleClick}
					className="green-border bg-green-300 rounded h-full">upgrade</button>
				<button onClick={handleReset}
					className="blue-border bg-blue-300 rounded h-full w-full">reset</button>
			</div>
		</div>
	);
};