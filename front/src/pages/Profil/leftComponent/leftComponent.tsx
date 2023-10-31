import * as React from "react"
import "../styleProfilPage/mainCSS.css"
import "../styleProfilPage/toolsCss.css"
import "./leftComponent.css"
import {InfoProfilComponent} from "./infoCurrentPerson/InfoProfilComponent"
import {GameStats} from "./infoCurrentUserStats/componentInfoGame"

interface Props {
	className?: string;
}

// const GameStats = () =>  {
// 	return (
// 			<div className="user-stat-elements red-border">
// 				<div className="user-stat-elements-info">
// 					<div className="name-stats green-border">
// 						name
// 					</div>
// 					<div className="level-stats blue-border">
// 						level
// 					</div>
// 				</div>
// 			</div>
// 	);
// }
export const LeftComponent = ({className}: Props) => {
	return (
		<div className="left-component-main text-xs red-border">
			<InfoProfilComponent/>
			<div className="user-stat-component">
				<GameStats/>
				<GameStats/>
				<GameStats/>
				<GameStats/>
				<GameStats/>
				<GameStats/>
			</div>
			{/*<FrameInfoProfil/>*/}
			{/*<FrameInfoGame/>*/}
		</div>
	);
}