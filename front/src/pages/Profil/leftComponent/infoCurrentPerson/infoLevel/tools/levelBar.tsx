import React, {forwardRef, useState} from "react";
import "../infoLevel.css"
import { Flex } from "../../../../tools/flex"

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
		<Flex className="progress-bar" style={{justifyContent: "start", height: "100%"}}>
			<Flex className="progress-label" style={{width: "100%", height: "100%", alignItems: "center"}}>{progress}%</Flex>
			<div className="progress-bar-fill" style={{width: `${progress}%`, backgroundColor: getColor()}}>
			</div>
		</Flex>
	);
};