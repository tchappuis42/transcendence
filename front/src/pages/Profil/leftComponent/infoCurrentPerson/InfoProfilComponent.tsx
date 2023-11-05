import React from "react"
import "./infoProfilComponent.css"
import "../../styleProfilPage/toolsCss.css"
import {InfoProfileUser} from "./infoProfil/infoProfil"
import Wallpaper from "../../../image/wallpaper.jpg"
import {LevelUser} from "./infoLevel/infoLevel";

export const InfoProfilComponent = (): JSX.Element => {
	return (
		<>
			<img alt={"wallpaper"} src={Wallpaper} className="wallpaper"/>
			<InfoProfileUser/>
			<div className="information-level-component red-border">
				<LevelUser/>
			</div>
		</>
	);
};



