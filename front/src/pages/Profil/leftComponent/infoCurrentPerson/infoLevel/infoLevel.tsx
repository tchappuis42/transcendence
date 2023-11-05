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
		<div className="grid grid-cols-4 h-full rounded">
			<div className="flex justify-center items-center col-span-2 red-border rounded">
				<LevelBar progress={ progress }/>
			</div>
			<div className="flex justify-center items-center col-span-1 h-full">
				level 1000
			</div>
			<div className="row-span-1 grid grid-rows-2 col-span-1 h-full w-full">
				<button onClick={handleClick}
					className="green-border bg-green-300 rounded h-full">upgrade</button>
				<button onClick={handleReset}
					className="blue-border bg-blue-300 rounded h-full w-full">reset</button>
			</div>
		</div>
		// <Grid className="container-level-user" style={{height: "50px"}}>
		// 	<Flex style={{alignItems: "center", justifyContent: "center", height: "full"}}>
		// 		<LevelBar progress={ progress }/>
		// 	</Flex>
		// 	<Flex className="current-level" style={{justifyContent: "center", alignItems: "center", height: "50px"}}>
		// 		level 1000
		// 	</Flex>
		// 	<Grid style={{gridTemplateColumns: "1fr 1fr", gridTemplateRows: "subgrid", height: "50px", fontSize: "12px"}}>
		// 		<button onClick={handleClick} style={{
		// 			height: "50px",
		// 			aspectRatio: "2/1.5",
		// 			border: "solid 1px green",
		// 			borderRadius: "4px"
		// 		}}>
		// 			upgrade
		// 		</button>
		// 		<button onClick={handleReset} style={{
		// 			height: "50px",
		// 			aspectRatio: "2/1.5",
		// 			border: "solid 1px red",
		// 			borderRadius: "4px"
		// 		}}>reset</button>
		// 	</Grid>
		// </Grid>
	);
};
