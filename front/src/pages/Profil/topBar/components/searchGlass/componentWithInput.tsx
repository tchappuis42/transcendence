import * as React from "react"
import "../slanderousMenu.css"
import {useRef, useState} from "react";

type IsActivComponent = {
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
	inputRef: React.RefObject<HTMLInputElement>;
};

export const ComponentWithInput = ({setIsActive, inputRef}: IsActivComponent) => {
	const [search, setSearch]: [string, (search: string) => void] = useState("");

	console.log('inputRef:', inputRef);
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setSearch(event.target.value);
	};

	const handleKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === "Enter")
			setSearch("");
	};

	// const handleClick = (event: React.MouseEvent): void => {
	// 	event.stopPropagation();
	// }
	//
	const handleBlur = (event: React.FocusEvent): void => {
		if (!event.currentTarget.contains(event.relatedTarget as Node)) {
			setIsActive(false);
		}
	};

	return (
		<input
			/* onClick={handleClick}*/ onBlur={handleBlur}
			ref={inputRef}
			type="text"
			value={search}
			onChange={handleSearchChange}
			onKeyDown={handleKeyDown}
			className="origin-top-right absolute
		right-20 black-border-fine rounded"
			>
		</input>
	);
}