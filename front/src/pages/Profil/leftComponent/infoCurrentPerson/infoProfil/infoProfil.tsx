import * as React from 'react'
import "../../../styleProfilPage/mainCSS.css"
import "../infoProfilComponent.css"
import "./infoProfile.css"
import PPictures from "../../../../image/kdi-noce.jpg"
import {ButtonsFriends} from "./tools/buttonsFriends"
import {MyName} from "./tools/personalInformations"
export const InfoProfileUser = (): JSX.Element => {
	return (
			<div className="information-user-component red-border">
				<img alt="image de profil" className="rounded h-full col-span-1 black-border-fine"
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
				<div className="text-information-component green-border">
					<ButtonsFriends/>
					<MyName/>
				</div>
			</div>
	);
}