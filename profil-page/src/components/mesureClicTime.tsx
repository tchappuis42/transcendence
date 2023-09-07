import * as React from "react";
import "../style/clic.css";
import {useEffect, useState} from "react";

const Clic = () => {
	const [lastClic, setLastClic] = useState(0);
	const [timeClic, setTimeClic] = useState(0);
	const [nbClic, setNbClic] = useState(1);
	const [historic, setHistoric] = useState([]);

	function handleClic(): void {
		setNbClic((e: number) => e + 1);
		console.log("number of click, and the time", nbClic, timeClic);
		const currenTime = Date.now();

		if (lastClic !== 0 && nbClic === 2) {
			setTimeClic(currenTime - lastClic);
			setLastClic(0);
			setNbClic(1);
		}
		else {
			setLastClic(currenTime);
			setHistoric((prevHistoric) => [...prevHistoric, timeClic]);
		}
	}

	function handleReplay(): void {
		setLastClic(0);
		setTimeClic(0);
		setNbClic(1);
		setHistoric([]);
	}

	return (
		<>
			<div>
				<h1 className="header">
					How fast are you for clicking
				</h1>
					<p className="legend">
						<button type="button" onClick={handleClic}>
							click fast as you can
						</button>
					</p>
			</div>
			<div>
				<p className="box">
					{timeClic} ms
				</p>
			</div>
			<h1>
				Historic
			</h1>
			<p className="box_historic">
				{
					historic.map(
						(time, index) => (
							<p key={index}> {time} ms</p>
						)
					)
				}
			</p>
			<button type="button" onClick={handleReplay}>
				replay
			</button>
		</>
	);
}

export default Clic