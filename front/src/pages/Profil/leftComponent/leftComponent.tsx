import * as React from "react"
import "./leftComponent.css"
import {GameStats} from "./infoCurrentUserStats/componentInfoGame"
import {InfoProfilComponent} from "./infoCurrentPerson/InfoProfilComponent"

interface Props {
	className?: string;
}

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
		</div>
	);
}