import "./leftComponent.css"
import {GameStats} from "./infoCurrentUserStats/componentInfoGame"
import {InfoProfilComponent} from "./infoCurrentPerson/InfoProfilComponent"

interface Props {
	className?: string;
}

export const LeftComponent = ({className}: Props) => {
	return (
		<div className="left-component-main text-xs red-border">

			<div className="info-profile-component red-border"
				 style={{gridTemplateRows: "5fr 2fr 1fr"}}>
				<InfoProfilComponent/>
			</div>
			<div className="user-stat-component red-border">
				<GameStats/>
			</div>
		</div>
	);
}