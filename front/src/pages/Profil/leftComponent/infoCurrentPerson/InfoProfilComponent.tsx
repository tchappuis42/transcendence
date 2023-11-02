import React from "react"
import "./infoProfilComponent.css"
import "../../styleProfilPage/toolsCss.css"
import {InfoProfileUser} from "./infoProfil/infoProfil"
import {LevelUser} from "./infoLevel/infoLevel"
import Wallpaper from "../../../image/wallpaper.jpg"

export const InfoProfilComponent = (): JSX.Element => {
	return (
		<>
			<div className="wallpaper red-border">
				<img alt={"wallpaper"} src={Wallpaper} className="wallpaper"/>
				{/*h1*/}
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



