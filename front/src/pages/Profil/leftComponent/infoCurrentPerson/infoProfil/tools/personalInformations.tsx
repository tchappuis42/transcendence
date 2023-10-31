import React, {useState} from "react"
import "../../../../styleProfilPage/toolsCss.css"
import "../infoProfile.css"
import { Flex } from "../../../../../tools/flex";
import { Grid } from "../../../../../tools/grid";
interface Props {
	name?: string;
}
export const MyName = ({name}: Props) => {
	const [level, setLevel] = useState(0);
	const handleCLickButton = () => {
		if (level < 1000)
			setLevel(level + 20);
	}
	const handleClickReset = () => {
		setLevel(0);
	}
	return (
		<div className="rest-information-component blue-border">
			<div className="name-component blue-border">
				{name}
			</div>
			<div className="rank-component blue-border">
				<div className="current-level-component blue-border">
					rank: {level}
				</div>
				<div className="up-reset-component blue-border">
					<button className="red-border bg-green-300" onClick={handleCLickButton}>
						level-up
					</button>
					<button className="blue-border bg-rose-500" onClick={handleClickReset}>
						Reset
					</button>
				</div>
			</div>
		</div>
		// <div className="main-me-component green-border">
		// 	<div className="name-component green-border">
		// 		kdi-noce
		// 	</div>
		// 	<div className="rank-component">
		// 		<div className="rank-text green-border">
		// 			rank: {level}
		// 		</div>
		// 		<div className="table-1x2">
		// 			<button className="button-up-reset green-border"
		// 					onClick={handleCLickButton}>
		// 				level-up
		// 			</button>
		// 			<button className="button-up-reset green-border"
		// 					onClick={handleClickReset}>
		// 				Reset
		// 			</button>
		// 		</div>
		// 	</div>
		// </div>
	);
}