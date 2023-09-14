import * as React from "react"
import "../style/my-style.css";
import {useEffect, useState} from "react";
import {ChangeEvent} from "react";
import * as events from "events";

const User = () => {

	const	[data, setData] = useState({"fname": "Maria", "lname": "Villaroel"});
	const	[originalName, setOriginalName] = useState(data.fname);
	const	[count, setCount] = useState(0);
	const	[calculation, setCalculation] = useState(0);

	// Use useEffect for display the number of time you access to the page: 1 time everytime.
	useEffect((): void => {
		setTimeout((): void => {
			setCount((count: number) => count + 1);
			}, 1000);
	}, []);

	// Use useEffect for display the number of time you clicked on the button: increase by 1 each time.
	useEffect(():void => {
		setCalculation((): number => 0);
	}, []);

	// Use prevState for
	const	updateName = (): void => {
		setData(prevState => {
			return { ...prevState, fname: "JB"}
		});
	}

	const	resetName = (): void => {
		setData(prevState => {
			return { ...prevState, fname: "Maria"}
		})
	}

	const handleNameChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setOriginalName(event.target.value);
	}

	return (
		<>
			<h1 className="header">
				you have been in this page {count} time !
			</h1>
				<h2 className="header">
					return my favorite person, {data.fname} {data.lname} !
				</h2>
					<p className="counter">
						<button type="button" onClick={() => setCalculation((e: number) => e + 1)}>increase</button>
						<br/>
						you have clicked {calculation} time !
					</p>
						<input type="text" value={originalName} onChange={handleNameChange}/>
							<button type="button" onClick={updateName}>
								JB, HOO!
							</button>
								{ data.fname !== originalName && ( <button type="button" onClick={resetName}>
								Reset Name !
							</button>
							)}
		</>
	)
}

export default User