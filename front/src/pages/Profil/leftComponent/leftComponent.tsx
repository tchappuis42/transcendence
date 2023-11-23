import "./leftComponent.css"
import {GameStats} from "./infoCurrentUserStats/componentInfoGame"
import {InfoProfilComponent} from "./infoCurrentUser/InfoProfilComponent"
import {UserStatus} from "../tools/userStatus";

interface Props {
	id: number;
}


export const LeftComponent = ({id}: Props) => {
	return (
		<div className="left-component-main text-xs">
			<div className="info-profile-component gray-border"
				 style={{gridTemplateRows: "5fr 2fr 1fr"}}>
				<InfoProfilComponent id={id}/>
			</div>
			<div className="user-stat-component">
				<GameStats id={id}/>
			</div>
		</div>
	);
}