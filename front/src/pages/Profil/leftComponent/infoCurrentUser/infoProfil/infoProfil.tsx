import * as React from 'react'
import "../../../styleProfilPage/mainCSS.css"
import "../infoProfilComponent.css"
import "./infoProfile.css"
import {MyName} from "./tools/personalInformations"
import {useAccount} from "../../../../../ui/organisms/useAccount";

interface Props {
	index: number;
	user: string;
	status: number;
	id: number;
}

export const InfoProfileUser = (): JSX.Element => {
	const { account } = useAccount()

	return (
			<div className="information-user-component">
				<img alt="image de profil" className="rounded h-full col-span-1 black-border-fine"
					 src="https://cdn.intra.42.fr/users/9f5331cff289327a4c7d42c2a66884de/kdi-noce.jpg"/>
				<div className="text-information-component">
					<MyName/>
				</div>
			</div>
	);
}