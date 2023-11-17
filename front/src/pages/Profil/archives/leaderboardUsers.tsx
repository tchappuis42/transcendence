import * as React from "react"

interface Props {
	rank: number;
	name: string;
	points: number;
};

export const LeaderboardUsers = ({rank, name, points}: Props) => {
	return (
		<div className="grid grid-cols-3 px-2 rounded p-1 font-bold"
			 style={{
				 border: "solid 1px red",
				 height: "40px",
				 backgroundColor: "lightgray",
				 fontSize: "12px"
			}}>
			<div className="flex flex-row px-2 rounded items-center overflow-auto"
				 style={{height: "100%"}}>
				{rank}
			</div>
			<div className="flex flex-row px-2 rounded items-center"
				 style={{height: "100%"}}>
				{name}
			</div>
			<div className="flex flex-row px-2 rounded justify-center items-center"
				 style={{height: "100%"}}>
				{points}
			</div>
		</div>
	);
}