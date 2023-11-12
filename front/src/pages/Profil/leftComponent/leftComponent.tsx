import "./leftComponent.css"
import {GameStats} from "./infoCurrentUserStats/componentInfoGame"
import {InfoProfilComponent} from "./infoCurrentUser/InfoProfilComponent"

interface Props {
	className?: string;
}

export const LeftComponent = ({className}: Props) => {
	return (
		<div className="left-component-main text-xs">
			<div className="info-profile-component text-xs text-gray-800 uppercase bg-white border dark:bg-gray-800 dark:border-black shadow-md sm:rounded-lg"
				 style={{gridTemplateRows: "5fr 2fr 1fr"}}>
				<InfoProfilComponent/>
			</div>
			<div className="user-stat-component">
				<GameStats/>
			</div>
		</div>
	);
}