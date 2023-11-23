import React from "react"
import "./infoProfilComponent.css"
import "../../styleProfilPage/toolsCss.css"
import {InfoProfileUser} from "./infoProfil/infoProfil"
import Wallpaper from "../../../image/wallpaper.jpg"
import {LevelUser} from "./infoLevel/infoLevel";
import {UserStatus} from "../../tools/userStatus";

interface Props {
	id: number;
}
export const InfoProfilComponent = ({id}: Props): JSX.Element => {

	const { sorted } = UserStatus();
	const user = sorted.find(u => u.id === id);

	return (
		<>
			<img alt={"wallpaper"} src={Wallpaper} className="wallpaper black-border-fine"/>
			<InfoProfileUser id={id}/>
			<div className="information-level-component">
				<LevelUser id={id}/>
			</div>
		</>
	);
};



