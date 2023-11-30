import React, {forwardRef, useState} from "react";
import "./levelBar.css"
import "../../../../styleProfilPage/toolsCss.css"

interface Props {
	progress: number;
}
export const LevelBar = ({progress}: Props) => {
	const getColor = (): string => {
		if (progress < 40) {
			return ("#ff0000");
		}
		else if (progress < 70) {
			return ("#ffa500");
		}
		else {
			return ("#2ecc71");
		}
	}
	return (
		<div className="level-bar-component black-border-separation-sl">
			<div className="level-current-percentage">
				{progress}%
			</div>
			<div className="h-full"
				 style={{width: `${progress}%`, backgroundColor: getColor()}}>
			</div>
		</div>
	);
};