import React, {useState} from "react";
import "./infoLevel.css"
import {LevelBar} from "./tools/levelBar";

interface Props {
	id: number;
}

export const LevelUser = (id: Props): JSX.Element => {
	const [progress, setProgress] = useState(0);
	const [level, setLevel] = useState(0);
	const handleClick = (): void => {
		if (progress < 100)
			setProgress(progress + 20);
		else {
			setProgress(0);
			setLevel(level + 10);
		}
	};
	const handleReset = (): void => {
		setProgress(0);
		setLevel(0);
	}
	return (
		<div className="level-user-component black-border-fine">
			<div className="level-current-component">
				level {level}
			</div>
			<LevelBar progress={ progress }/>
			<div className="level-buttons-component">
				<button onClick={handleClick}
					className="green-border bg-green-300 rounded h-full">upgrade</button>
				<button onClick={handleReset}
					className="blue-border bg-blue-300 rounded h-full w-full">reset</button>
			</div>
		</div>
	);
};
