import React from "react"
import "../../styleProfilPage/toolsCss.css"
import "../leftComponent.css"
import {InfoProfileUser} from "./infoProfil/infoProfil"
import {LevelUser} from "./infoLevel/infoLevel"
import Wallpaper from "../../../image/wallpaper.jpg"

export const InfoProfilComponent = (): JSX.Element => {
	return (
		<>
			<div className="wallpaper red-border">
				h1
			</div>
			<InfoProfileUser/>
			<div className="information-level-component red-border">
				h2
			</div>
		</>
		// <div className="info-profile-component red-border">
		// 	<img alt={"wallpaper"} src={Wallpaper} className="wallpaper"/>
		// 	<div className="information-user-component">
		// 		<ProfileUser/>
		// 		<LevelUser />
		// 	</div>
		// </div>
	);
};



