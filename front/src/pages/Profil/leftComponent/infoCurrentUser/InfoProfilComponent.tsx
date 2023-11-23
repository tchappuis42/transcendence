import React from "react"
import "./infoProfilComponent.css"
import "../../styleProfilPage/toolsCss.css"
import {InfoProfileUser} from "./infoProfil/infoProfil"
import Wallpaper from "../../../image/wallpaper.jpg"
import {LevelUser} from "./infoLevel/infoLevel";
import {UserStatus} from "../../tools/userStatus";

export const InfoProfilComponent = (): JSX.Element => {

	const { sorted } = UserStatus();

	console.log(sorted.map(u => u.id))
	console.log(sorted.map(u => u.status))
	console.log(sorted.map(u => u.username))

	return (
		<>
			<img alt={"wallpaper"} src={Wallpaper} className="wallpaper black-border-fine"/>
			<InfoProfileUser/>
			<div className="information-level-component">
				<LevelUser/>
			</div>
		</>
	);
};



