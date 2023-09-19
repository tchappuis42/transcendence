import { useState } from "react";

const GameRules = () => {

	const [rules, setRules] = useState(true)
	const Rules = () => {
		setRules(false)
	};

	return <div>
		{rules &&
			<div className='rules'>
				<h1>Rules</h1>
				<p>blablabla</p>
				<p>blablabla</p>
				<span onClick={Rules}>ready</span>
			</div>
		}
	</div>
};
export default GameRules;