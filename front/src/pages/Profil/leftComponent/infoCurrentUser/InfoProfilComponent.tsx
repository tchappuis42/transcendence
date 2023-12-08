import React from "react"
import "./infoProfilComponent.css"
import "../../styleProfilPage/toolsCss.css"
import Wallpaper from "../../../image/wallpaper.jpg"
import { MyName } from "./infoProfil/tools/personalInformations"
import { LevelUser } from "./infoLevel/infoLevel"

interface User {
	id: number;
	username: string;
  }
  
  interface InfoProfilComponentProps {
	user: User | undefined;
  }

export const InfoProfilComponent : React.FC<InfoProfilComponentProps> = ({user}): JSX.Element => {



	return (
		<>
			<div className="information-user-component">
				<img alt="image de profil" className="rounded h-full col-span-1 black-border-fine"
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
				<div className="text-information-component">
					<MyName id={user?.id} username={user?.username} index={0}/>
				</div>
			</div>
			<div className="information-level-component">
				<LevelUser user={user}/>
			</div>
		</>
	);
};



