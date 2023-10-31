import React, {useRef, useState} from "react";
import "./infoLevel.css"
import { LevelBar } from "./tools/levelBar";
import { Flex } from "../../../../tools/flex";
import {Grid} from "../../../../tools/grid";

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
		<Grid className="container-level-user" style={{height: "50px"}}>
			<Flex style={{alignItems: "center", justifyContent: "center", height: "50px"}}>
				<LevelBar progress={ progress }/>
			</Flex>
			<Flex className="current-level" style={{justifyContent: "center", alignItems: "center", height: "50px"}}>
				level 1000
			</Flex>
			<Grid style={{gridTemplateColumns: "1fr 1fr", gridTemplateRows: "subgrid", height: "50px", fontSize: "12px"}}>
				<button onClick={handleClick} style={{
					height: "50px",
					aspectRatio: "2/1.5",
					border: "solid 1px green",
					borderRadius: "4px"
				}}>
					upgrade
				</button>
				<button onClick={handleReset} style={{
					height: "50px",
					aspectRatio: "2/1.5",
					border: "solid 1px red",
					borderRadius: "4px"
				}}>reset</button>
			</Grid>
		</Grid>
	);
};
