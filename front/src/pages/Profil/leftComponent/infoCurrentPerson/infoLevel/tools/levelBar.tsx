import React, {forwardRef, useState} from "react";
import "../infoLevel.css"
import {Flex} from "../../../../tools/flex"

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
		<div className="relative h-full w-full rounded">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				{progress}%
			</div>
			<div className="h-full rounded"
				 style={{width: `${progress}%`, backgroundColor: getColor()}}>
			</div>
		</div>
	);
};
// <Flex className="progress-bar" style={{justifyContent: "start", height: "100%"}}>
// 	<Flex className="progress-label" style={{width: "100%", height: "100%", alignItems: "center"}}>{progress}%</Flex>
// 	<div className="progress-bar-fill" style={{width: `${progress}%`, backgroundColor: getColor()}}>
// 	</div>
// </Flex>