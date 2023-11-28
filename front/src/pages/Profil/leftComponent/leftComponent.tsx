import "./leftComponent.css"
import {InfoProfilComponent} from "./infoCurrentUser/InfoProfilComponent"
import { GameStats } from "./infoCurrentUserStats/componentInfoGame";

interface Props {
	id: number;
}

interface User {
	id: number;
	username: string;
  }
  
  interface LeftComponentProps {
	user: User | undefined;
  }

export const LeftComponent: React.FC<LeftComponentProps> = ({user}) => {
	return (
		<div className="z-20 left-component-main text-xs">
			<div className="info-profile-component gray-border"
				 style={{gridTemplateRows: "5fr 2fr 1fr"}}>
				<InfoProfilComponent user={user}/>
			</div>
			<div className="user-stat-component">
				<GameStats id={user?.id}/>
			</div>
		</div>
	);
}

