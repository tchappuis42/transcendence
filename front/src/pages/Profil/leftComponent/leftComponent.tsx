import * as React from "react"
import "../styleProfilPage/mainCSS.css"
import "../styleProfilPage/toolsCss.css"
import "./leftComponent.css"
import { InfoProfilComponent } from "./infoCurrentPerson/InfoProfilComponent"
import { FrameInfoGame } from "./infoCurrentUserStats/FrameInfoGame"

interface Props {
	className?: string;
}

const GameStats = () =>  {
	return (
			<div className="user-stat-elements red-border">
				<div className="user-stat-elements-info">
					<div className="name-stats green-border">
						name
					</div>
					<div className="level-stats blue-border">
						level
					</div>
				</div>
			</div>
	);
}
export const LeftComponent = ({className}: Props) => {
	return (
		<div className="left-component-main text-xs red-border">
			<InfoProfilComponent/>
			{/*<div className="info-profile-component">*/}
			{/*		<div className="wallpaper red-border">*/}
			{/*			wallpaper*/}
			{/*		</div>*/}
			{/*		<div className="information-user-component red-border">*/}
			{/*			<div className="profil-pictures-component blue-border">*/}
			{/*				h1*/}
			{/*			</div>*/}
			{/*			<div className="text-information-component green-border">*/}
			{/*				<div className="add-friends-buttons">*/}
			{/*					<button className="red-border">but1</button>*/}
			{/*					<button className="red-border">but2</button>*/}
			{/*				</div>*/}
			{/*				<div className="rest-information-component blue-border">*/}
			{/*					<div className="name-component blue-border">*/}
			{/*						h2*/}
			{/*					</div>*/}
			{/*					<div className="rank-component blue-border">*/}
			{/*						<div className="current-level-component blue-border">*/}
			{/*							a1*/}
			{/*						</div>*/}
			{/*						<div className="up-reset-component blue-border">*/}
			{/*							<button className="red-border">*/}
			{/*								e1*/}
			{/*							</button>*/}
			{/*							<button className="blue-border">*/}
			{/*								e1*/}
			{/*							</button>*/}
			{/*						</div>*/}
			{/*					</div>*/}
			{/*				</div>*/}
			{/*			</div>*/}
			{/*		</div>*/}
			{/*		<div className="information-level-component red-border">*/}
			{/*			h2*/}
			{/*		</div>*/}
			{/*</div>*/}
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