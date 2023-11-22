import * as React from "react"
import "../../css/index.css"
import "./styleProfilPage/mainCSS.css"
import "./styleProfilPage/toolsCss.css"
import {LeftComponent} from "./leftComponent/leftComponent"
import {Leaderboard} from "./middleComponent/leaderboard"
import {ChatSide} from "./rightComponent/chatSide"
import { Button } from "@material-tailwind/react";

export default function Example() {
	return <Button>Button</Button>;
}
export const Profil = () => {
	return (
		<>
			<div className="mainBox gap-4">
				<div className="mainTable h-screen-top-bar
				grid-cols-1 md:grid-cols-2 lg:grid-cols-3
				blue-border">
					<LeftComponent/>
					<Leaderboard/>
					<ChatSide/>
				</div>
			</div>
		</>
	);
}