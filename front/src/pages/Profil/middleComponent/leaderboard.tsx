import * as React from "react"
import "../styleProfilPage/mainCSS.css"
import "./leaderboard.css"
import {LeaderboardUsers} from "./leaderboardInfo/leaderboardUsers";
import {LeaderboardUsersInfo} from "./leaderboardInfo/leaderboardInfo";
import {LeaderboardComponent} from "./leaderboardInfo/leaderboardComponent";

interface Props {
	className?: string;
}

const ComponentInfo = ({className}: Props) => {
	return(
		<div className="ranking-component pr-3 blue-border">
			<div className="ranking-component-elements-info col-span-1 red-border">rank</div>
			<div className="ranking-component-elements-info col-span-4 red-border">name</div>
			<div className="ranking-component-elements-info col-span-2 red-border">points</div>
		</div>
	);
}
const ComponentElements = ({className}: Props) => {
	return(
		<div className="ranking-component-elements blue-border">
			<div className="ranking-component-elements-info col-span-1 red-border">rank</div>
			<div className="ranking-component-elements-info col-span-4 red-border">name</div>
			<div className="ranking-component-elements-info col-span-2 red-border">10000</div>
		</div>
	);
}
export const Leaderboard = ({className}: Props) => {
	return(
		<div className="middle-component-main blue-border">
			<div className="leaderboard-component-main red-border">
				{/*<div className="main-card-component red-border">*/}
				{/*	<div className="daily-component blue-border">*/}
				{/*		<div className="title-component red-border">*/}
				{/*			h3*/}
				{/*		</div>*/}
				{/*		<div className="ranking-component-main red-border">*/}
				{/*			<ComponentInfo/>*/}
				{/*			<div className="ranking-component-elements-table pr-3 blue-border">*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*	<div className="daily-component blue-border">*/}
				{/*		<div className="title-component red-border">*/}
				{/*			h3*/}
				{/*		</div>*/}
				{/*		<div className="ranking-component-main red-border">*/}
				{/*			<ComponentInfo/>*/}
				{/*			<div className="ranking-component-elements-table pr-3 blue-border">*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*				<ComponentElements/>*/}
				{/*			</div>*/}
				{/*		</div>*/}
				{/*	</div>*/}
				{/*</div>*/}
			</div>
		</div>
		// <div className="flex flex-col gap-10 justify-center items-center"
		// 	 style={{height: "100vh", padding: "10px"}}>
		// 	<div className="grid grid-cols-1 gap-y-16 p-4 bg-gray-100 rounded-lg"
		// 		 style={{
		// 			 border: "solid 1px blue",
		// 			 width: "25vw",
		// 			 paddingTop: "40px",
		// 			 paddingBottom: "35px",
		// 			 height: "35vh"
		// 		 }}>
		// 		<div className="flex flex-row px-2 justify-center items-center rounded h-auto font-bold"
		// 			style={{backgroundColor: "lightgray"}}>
		// 			General ranking
		// 		</div>
		// 		<LeaderboardComponent/>
		// 	</div>
		// 	<div className="grid grid-cols-1 gap-y-16 p-4 bg-gray-100 rounded-lg"
		// 		 style={{
		// 			 border: "solid 1px blue",
		// 			 width: "25vw",
		// 			 paddingTop: "40px",
		// 			 paddingBottom: "35px",
		// 			 height: "35vh"
		// 		 }}>
		// 		<div className="flex flex-row px-2 justify-center items-center rounded h-auto font-bold"
		// 			 style={{backgroundColor: "lightgray"}}>
		// 			Daily ranking
		// 		</div>
		// 		<LeaderboardComponent/>
		// 	</div>
		// </div>
	);
}