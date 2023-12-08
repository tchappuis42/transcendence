import React, {forwardRef, useState} from "react";
import "./levelBar.css"
import "../../../../styleProfilPage/toolsCss.css"

interface Props {
	progress: number;
}
export const LevelBar = ({progress}: Props) => {

	const getColor = (): string => {
		if (progress < 40) {
			return ("rgba(200, 0, 0, 0.5)");
		}
		else if (progress < 70) {
			return ("rgba(255,165,0, 0.5)");
		}
		else {
			return ("rgba(0, 200, 0, 0.5)");
		}
	}
	
	return (
		<div className="level-bar-component black-border-separation-sl">
			<div className="level-current-percentage">
				{progress.toFixed(2)}%
			</div>
			<div className="h-full text-white"
				 style={{width: `${progress}%`, backgroundColor: getColor()}}>
			</div>
		</div>
	);
};