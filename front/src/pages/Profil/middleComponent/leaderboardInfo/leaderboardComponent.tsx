import * as React from "react"
import "../../styleProfilPage/mainCSS.css"
import {LeaderboardUsers} from "./leaderboardUsers";
import {LeaderboardUsersInfo} from "./leaderboardInfo";

export const LeaderboardComponent = () => {
	return (
		<div className="grid grid-cols-1 items-start gap-2"
		style={{overflow: "hidden"}}>
			<div className="items-start px-2 rounded">
				<LeaderboardUsersInfo/>
			</div>
				<div className="h-full
				grid grid-cols-1 items-start gap-2 px-2 rounded overflow-y-scroll">
					<LeaderboardUsers rank={1} name={"mvillarr"} points={1000}/>
					<LeaderboardUsers rank={2} name={"tchappui"} points={999}/>
					<LeaderboardUsers rank={3} name={"nhirzel"} points={888}/>
					<LeaderboardUsers rank={4} name={"kdi-noce"} points={777}/>
					<LeaderboardUsers rank={5} name={"pyammoun"} points={666}/>
					<LeaderboardUsers rank={6} name={"mvillarr"} points={555}/>
					<LeaderboardUsers rank={7} name={"mvillarr"} points={444}/>
					<LeaderboardUsers rank={8} name={"mvillarr"} points={333}/>
				</div>
		</div>
	);
}
