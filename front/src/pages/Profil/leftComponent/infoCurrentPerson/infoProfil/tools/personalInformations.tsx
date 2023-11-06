import React, {useState} from "react"
import "../../../../styleProfilPage/toolsCss.css"
import "../infoProfile.css"
import {useAccount} from "../../../../../../ui/organisms/useAccount";

export const MyName = () => {
	const { account } = useAccount()
	const [level, setLevel] = useState(0);
	const handleCLickButton = () => {
		if (level < 1000)
			setLevel(level + 20);
	}
	const handleClickReset = () => {
		setLevel(0);
	}
	return (
		<div className="rest-information-component blue-border">
			<div className="name-component blue-border">
				{account.username}
			</div>
			<div className="rank-component blue-border">
				<div className="current-level-component blue-border">
					rank: {level}
				</div>
				<div className="up-reset-component blue-border">
					<button className="red-border bg-green-300" onClick={handleCLickButton}>
						level-up
					</button>
					<button className="blue-border bg-rose-500" onClick={handleClickReset}>
						Reset
					</button>
				</div>
			</div>
		</div>
	);
}