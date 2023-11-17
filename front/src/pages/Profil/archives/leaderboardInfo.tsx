import * as React from "react"

export const LeaderboardUsersInfo = () => {
	return (
		<div className="grid grid-cols-3 px-2 rounded p-1"
			 style={{border: "solid 1px red", height: "40px", backgroundColor: "lightgray"}}>
			<div className="flex flex-row px-2 rounded font-bold"
				 style={{height: "100%"}}>
				rank
			</div>
			<div className="flex flex-row px-2 rounded font-bold"
				 style={{height: "100%"}}>
				name
			</div>
			<div className="flex flex-row px-2 rounded font-bold justify-center"
				 style={{height: "100%"}}>
				points
			</div>
		</div>
	);
}